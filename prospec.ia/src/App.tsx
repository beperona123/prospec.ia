import Navbar from './components/Navbar.tsx'
import Sidebar from './components/Sidebar.tsx'
import Leadtable from './components/Leadtable.tsx'

export default function App() {

  return (
    <div className="h-screen w-screen">
      <Navbar />
      <main className="flex flex-row h-screen">
        <div className="flex">
            <Sidebar />
        </div>
        <div className="ml-[12%] p-5 mt-[55px] flex h-[100%]">
          <Leadtable />
        </div>

      </main>
    </div>
  )
}