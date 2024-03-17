import { useState, useEffect } from "react";

import "./App.css";

function App() {
  let [products, setProducts] = useState();
  let [filterProds, setFilterProds] = useState("all");
  let [sortProds, setSortProds] = useState("default");
  let [searchProds, setSearchProds] = useState("default");
  useEffect(() => {
    fetch("https://ecommerce.routemisr.com/api/v1/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.data);
        console.log(data.data);
      });
  }, []);

  const handleFilterByCat = (e) => {
    setFilterProds(e.target.id);
    console.log(e.target.id);
  };
  const handleSortProducts = (e) => {
    setSortProds(e.target.id);
    console.log(e.target.id);
  };
  const handleSearch = (e) => {
    /*
    const newProduct = sortedProducts.filter((value) =>
      value.title.toLowerCase().includes(e.target.value.toLowerCase())
    );*/
    setSearchProds(e.target.value.toLowerCase());
    //
    setSortProds("search");
  };
  // filter by cat
  const filterProducts = products?.filter((value) => {
    if (filterProds === "all") {
      return true;
    } else {
      return value.category.slug === filterProds;
    }
  });
  // sort prods
  const sortedProducts =
    sortProds === "low"
      ? filterProducts.sort((a, b) => a.price - b.price)
      : sortProds === "high"
      ? filterProducts?.sort((a, b) => b.price - a.price)
      : sortProds === "default"
      ? filterProducts
      : sortProds === "a-z"
      ? filterProducts?.sort((a, b) => (a.title > b.title ? 1 : -1))
      : sortProds === "z-a"
      ? filterProducts?.sort((a, b) => (a.title > b.title ? -1 : 1))
      : sortProds === "oldest"
      ? filterProducts.sort((a, b) =>
          a.createdAt
            .split("/")
            .reverse()
            .join()
            .localeCompare(b.createdAt.split("/").reverse().join())
        )
      : sortProds === "new"
      ? filterProducts.sort((b, a) =>
          a.createdAt
            .split("/")
            .reverse()
            .join()
            .localeCompare(b.createdAt.split("/").reverse().join())
        )
      : sortProds === "search"
      ? filterProducts.filter((value) =>
          value.title.toLowerCase().includes(searchProds)
        )
      : null;
  let cat = [
    {
      name: "Men's Fashion",
      slug: "men's-fashion",
    },
    {
      name: "Women's Fashion",
      slug: "women's-fashion",
    },
    {
      name: "Electronics",
      slug: "electronics",
    },
  ];

  return (
    <>
      <div>
        <nav className="nav-bg p-4 mb-4">
          <span className="text-2xl">sort</span>
        </nav>
        <div className="">
          <div className="max-w-[1240px] mx-auto">
            <div className="p-4 rounded border-[1px] w-full">
              <input
                type="text"
                placeholder="search"
                className="w-full h-[50px] p-4 rounded text-xl"
                onChange={handleSearch}
              />
            </div>

            <div className="grid grid-cols-10 gap-6">
              <div className="col-span-2 p-4">
                <h2 className="text-xl mb-4">filters</h2>
                <div className="rounded border-[1px] min-h-[300px] p-2">
                  {/** filter by cat */}
                  <div>
                    <h3>filter by category:</h3>
                    <form>
                      <input
                        defaultChecked
                        className="mr-2"
                        type="radio"
                        id="all"
                        name="fav_language"
                        value={filterProds}
                        onChange={handleFilterByCat}
                      />
                      <label htmlFor="all">all</label>

                      {cat &&
                        cat.map((catt, i) => (
                          <div key={i}>
                            <input
                              className="mr-2"
                              type="radio"
                              id={catt.slug}
                              name="fav_language"
                              value={filterProds}
                              onChange={handleFilterByCat}
                            />
                            <label htmlFor={catt.slug}>{catt.name}</label>
                          </div>
                        ))}
                    </form>
                  </div>
                  <div>
                    {/** filter by cat */}

                    <h3>filter by</h3>
                    <form>
                      <div>
                        <input
                          defaultChecked
                          className="mr-2"
                          type="radio"
                          id="default"
                          name="fav_language"
                          value={sortProds}
                          onChange={handleSortProducts}
                        />
                        <label htmlFor="default">default</label>
                      </div>
                      <div>
                        <input
                          className="mr-2"
                          type="radio"
                          id="low"
                          name="fav_language"
                          value={sortProds}
                          onChange={handleSortProducts}
                        />
                        <label htmlFor="low">low to high</label>
                      </div>
                      <div>
                        <input
                          className="mr-2"
                          type="radio"
                          id="high"
                          name="fav_language"
                          value={sortProds}
                          onChange={handleSortProducts}
                        />
                        <label htmlFor="high">high to low</label>
                      </div>
                      <div>
                        <input
                          className="mr-2"
                          type="radio"
                          id="a-z"
                          name="fav_language"
                          value={sortProds}
                          onChange={handleSortProducts}
                        />
                        <label htmlFor="a-z">A-Z</label>
                      </div>
                      <div>
                        <input
                          className="mr-2"
                          type="radio"
                          id="z-a"
                          name="fav_language"
                          value={sortProds}
                          onChange={handleSortProducts}
                        />
                        <label htmlFor="z-a">Z-A</label>
                      </div>
                      <div>
                        <input
                          className="mr-2"
                          type="radio"
                          id="oldest"
                          name="fav_language"
                          value={sortProds}
                          onChange={handleSortProducts}
                        />
                        <label htmlFor="oldest">oldest</label>
                      </div>
                      <div>
                        <input
                          className="mr-2"
                          type="radio"
                          id="new"
                          name="fav_language"
                          value={sortProds}
                          onChange={handleSortProducts}
                        />
                        <label htmlFor="new">new</label>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="col-span-8 p-4">
                <h1 className="text-xl mb-4">products</h1>
                <div className="grid grid-cols-3 gap-5">
                  {sortedProducts &&
                    sortedProducts.map((product, i) => (
                      <div
                        key={i}
                        className="text-center  rounded border-[1px] w-[250px] "
                      >
                        <img
                          className="w-full h-[150px] object-contain"
                          src={product.imageCover}
                          alt=""
                        />
                        <p className="text-xl">{product.title}</p>
                        <div className="flex items-center justify-center">
                          <span className="mr-2">
                            {product.ratingsQuantity} rates{" "}
                          </span>
                          <span> {product.ratingsAverage}</span>
                        </div>
                        <div className="font-bold text-xl">
                          {product.price} $
                        </div>
                        {product.createdAt}
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
