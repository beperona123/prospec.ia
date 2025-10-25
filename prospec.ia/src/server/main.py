from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import firebase_admin
from firebase_admin import credentials, firestore
from openai import OpenAI
from dotenv import load_dotenv
import os
from fastapi.responses import JSONResponse
from fastapi.requests import Request
from fastapi.middleware.cors import CORSMiddleware

# Carregar variáveis de ambiente
load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")
client = OpenAI(api_key=api_key)

# Inicializar Firebase
cred = credentials.Certificate("firebase_key.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

# Inicializar FastAPI
app = FastAPI(title="CRM automático")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # ou ["http://localhost:5173"] se quiser limitar
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


#Cadstro e manipulação de clientes
# Modelo do cliente
class Cliente(BaseModel):
    nome: str
    email: str
    telefone: str
    produto: str
    preferencias: str
    impedimento: str
    sugestao: str   

# Função para gerar sugestão automática
def respostaAutomatica(impedimento):
    try:
        prompt = f"O cliente disse que '{impedimento}' o impede de aceitar o produto. Dê uma sugestão breve e empática, mostrando exemplos para contornar isso."
        response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.7,
    )
        return response.choices[0].message.content.strip()
    except Exception as e:
            print(f"Erro ao gerar resposta automática: {e}")
            return "Não foi possível gerar sugestão no momento."

# Criar cliente
@app.post("/clientes")
def cadastrar(cliente: Cliente):
    cliente_dict = cliente.dict()
    cliente_dict["sugestao"] = respostaAutomatica(cliente.impedimento)
    db.collection("clientes").document(cliente.email).set(cliente_dict)
    return {"msg": "Cliente criado com sucesso!", "dados": cliente_dict}

# Listar clientes
@app.get("/clientes")
def listar():
    docs = db.collection("clientes").stream()
    clientes = [cad.to_dict() for cad in docs]
    return clientes

# Atualizar cliente
@app.put("/clientes/{email}")
def atualizar(email: str, cliente: Cliente):

    ref = db.collection("clientes").document(email)
    doc = ref.get()

    if not doc.exists:
        raise HTTPException(status_code=404, detail="Cliente não encontrado.")

    antigo = doc.to_dict()
    novo = cliente.dict()

    # Se o impedimento mudou → gerar nova sugestão e recalcular propensão
    if antigo.get("impedimento") != novo["impedimento"]:
        novo["sugestao"] = respostaAutomatica(novo["impedimento"])
        novo["propensao"] = calcular_propensao(novo)

    ref.update(novo)
    return {"msg": "🔄 Cliente atualizado com sucesso!", "dados": novo}

# Deletar cliente
@app.delete("/clientes/{email}")
def deletar(email: str):
    ref = db.collection("clientes").document(email)
    if not ref.get().exists:
        raise HTTPException(status_code=404, detail="Cliente não encontrado.")
    ref.delete()
    return {"msg": "Cliente excluído com sucesso!"}


# Filtro automatico
def calcular_propensao(cliente):
    prompt = f"Com base nas informações abaixo, dê uma nota de 0 a 100 para a probabilidade do cliente aceitar o produto.\n\nNome: {nome}\nProduto: {produto}\nPreferências: {preferencias}\nImpedimento: {impedimento}\n\nApenas retorne o número (sem explicações)."
    nome = cliente.get("nome", "")
    produto = cliente.get("produto", "")
    preferencias = cliente.get("preferencias", "")
    impedimento = cliente.get("impedimento", "")

    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt}],
        temperature=0
    )
    try:
        nota = int(response.choices[0].message.content.strip())
        return nota
    except:
        return 0
   
@app.get("/clientes/filtro")
def filtrar():

    docs = db.collection("clientes").stream()
    clientes = [doc.to_dict() for doc in docs]

    clientes_ordenados = sorted(clientes, key=lambda x: x.get("propensao", 0))
    return clientes_ordenados


# Tratamento de erros
@app.exception_handler(Exception)
async def erro_geral(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={"msg": f"Erro interno: {str(exc)}"}
    )