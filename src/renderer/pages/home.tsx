function Home() {
  async function handleAdd() {
    const res = await window.api.fetchUsers()
    console.log(res)
  }

  return (
    <div>
      <h1>Página HOME!!!</h1>

      <button onClick={handleAdd}>TESTAR</button>
    </div>
  )
}

export { Home }
