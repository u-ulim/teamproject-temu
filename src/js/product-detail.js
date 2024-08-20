const productsURL =
  "https://my-json-server.typicode.com/u-ulim/temu-products/db";

fetch(productsURL)
  .then((response) => response.json())
  .then((data) => {
    // let idCounter = Date.now();
    const products = {
      data: data.products.map((item) => ({
        ...item,
      })),
    };
    const params = new URLSearchParams(window.location.search);
    const category = params.get("category");
    const title = params.get("name");
    // params에서 get은 name으로

    const product = products.data.find(
      (product) => product.category === category && product.title === title
    );

    console.log(product);
  });
