import Navbar from './components/Navbar.tsx'
import Sidebar from './components/Sidebar.tsx'
import Leadtable from './components/Leadtable.tsx'

export default function App() {

  return (
    <div className="flex flex-col w-screen">
      <Navbar />
      <main className="flex  max-h-screen ">
        <div className="max-w-screen pt-15  flex">
          <Leadtable />
        </div>

      </main>
    </div>
  )
}