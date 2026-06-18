import React from 'react'

function Mainroutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/recipe" element={<Recipe />} />
    </Routes>
  )
}

export default Mainroutes