import { useState } from "react";

const CATEGORIES = [
  "Electronics",
  "Clothing",
  "Accessories",
  "Groceries",
  "Home"
];

function App() {
  // Products state - Dito naka-store lahat ng initial items at mga bagong idadagdag.
  const [products, setProducts] = useState([
    { 
      id: 1, 
      name: "Laptop", 
      description: "15-inch laptop with 16GB RAM", 
      category: "Electronics", 
      price: 45000, 
      quantity: 5, 
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=100&auto=format&fit=crop&q=60" 
    },
    { 
      id: 2, 
      name: "T-Shirt", 
      description: "Plain cotton crew-neck shirt", 
      category: "Clothing", 
      price: 500, 
      quantity: 20, 
      image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=100&auto=format&fit=crop&q=60" 
    },
    { 
      id: 3, 
      name: "Mouse", 
      description: "Wireless optical mouse", 
      category: "Electronics", 
      price: 800, 
      quantity: 10, 
      image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=100&auto=format&fit=crop&q=60" 
    },
    { 
      id: 4, 
      name: "Necklace", 
      description: "A 18karat Saudi Gold Necklace", 
      category: "Accessories", 
      price: 23000, 
      quantity: 8, 
      image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=100&auto=format&fit=crop&q=60" 
    },
    { 
      id: 5, 
      name: "Ring", 
      description: "A 1.5grams 18karat gold", 
      category: "Accessories", 
      price: 7500, 
      quantity: 3, 
      image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=100&auto=format&fit=crop&q=60" 
    },
    { 
      id: 6, 
      name: "Canned foods", 
      description: "A high quality and delicious canned foods", 
      category: "Groceries", 
      price: 99, 
      quantity: 15, 
      image: "https://images.unsplash.com/photo-1534482421-64566f976cfa?w=100&auto=format&fit=crop&q=60" 
    },
    { 
      id: 7, 
      name: "Frozen Foods", 
      description: "Good quality frozen goods", 
      category: "Groceries", 
      price: 175, 
      quantity: 3, 
      image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=100&auto=format&fit=crop&q=60" 
    },
    { 
      id: 8, 
      name: "King Bed", 
      description: "A very soft and good quality bed", 
      category: "Home", 
      price: 12000, 
      quantity: 2, 
      image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=100&auto=format&fit=crop&q=60" 
    }
  ]);

  // FORM STATES: Dito natin kino-control ang inputs sa Add/Edit Product form
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  
  // PRODUCT IMAGE STATE: Para sa pag-handle ng image URL na pini-paste ni user
  const [imageUrl, setImageUrl] = useState("");

  // SEARCH & FILTER STATES
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("");
  const [selectedPriceFilter, setSelectedPriceFilter] = useState("");
  const [selectedQuantityFilter, setSelectedQuantityFilter] = useState("");

  const [editingId, setEditingId] = useState(null);

  // Validation para siguraduhing puno lahat ng required fields bago i-save
  const isFormComplete =
    productName.trim() !== "" &&
    description.trim() !== "" &&
    category !== "" &&
    String(price).trim() !== "" &&
    String(quantity).trim() !== "";

  function clearForm() {
    setProductName("");
    setDescription("");
    setCategory("");
    setPrice("");
    setQuantity("");
    setImageUrl("");
  }

  function addProduct() {
    if (!isFormComplete) return;

    const newId = products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;

    const newProduct = {
      id: newId,
      name: productName.trim(),
      description: description.trim(),
      category: category,
      price: Number(price),
      quantity: Number(quantity),
      image: imageUrl.trim() !== "" ? imageUrl.trim() : "https://via.placeholder.com/100"
    };
    setProducts([...products, newProduct]);
    clearForm();
  }

  function editProduct(product) {
    setEditingId(product.id);
    setProductName(product.name);
    setDescription(product.description);
    setCategory(product.category);
    setPrice(product.price);
    setQuantity(product.quantity);
    setImageUrl(product.image || "");
  }

  function updateProduct() {
    if (!isFormComplete) return;

    const updatedProducts = products.map((product) => {
      if (product.id === editingId) {
        return {
          ...product,
          name: productName.trim(),
          description: description.trim(),
          category: category,
          price: Number(price),
          quantity: Number(quantity),
          image: imageUrl.trim() !== "" ? imageUrl.trim() : product.image
        };
      }
      return product;
    });
    setProducts(updatedProducts);
    setEditingId(null);
    clearForm();
  }

  function deleteProduct(id) {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
  }

  // SEARCH & FILTER LOGIC
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategoryFilter === "" || product.category === selectedCategoryFilter;

    let matchesPrice = true;
    if (selectedPriceFilter === "under1000") {
      matchesPrice = product.price < 1000;
    } else if (selectedPriceFilter === "1000to10000") {
      matchesPrice = product.price >= 1000 && product.price <= 10000;
    } else if (selectedPriceFilter === "above10000") {
      matchesPrice = product.price > 10000;
    }

    let matchesQuantity = true;
    if (selectedQuantityFilter === "low") {
      matchesQuantity = product.quantity < 10;
    } else if (selectedQuantityFilter === "normal") {
      matchesQuantity = product.quantity >= 10;
    }

    return matchesSearch && matchesCategory && matchesPrice && matchesQuantity;
  });

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="mb-6 text-3xl font-bold">Product Management</h1>

      {/* ADD / EDIT PRODUCT FORM */}
      <div className="mb-8 rounded-lg bg-white p-6 shadow">
        <h2 className="mb-4 text-xl font-bold">
          {editingId === null ? "Add Product" : "Edit Product"}
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* PRODUCT NAME */}
          <div>
            <label className="mb-1 block font-medium">Product Name</label>
            <input
              type="text"
              className="w-full rounded border p-2"
              placeholder="Enter product name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>

          {/* CATEGORY (DROPDOWN) */}
          <div>
            <label className="mb-1 block font-medium">Category</label>
            <select
              className="w-full rounded border bg-white p-2"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select a category</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* PRICE */}
          <div>
            <label className="mb-1 block font-medium">Price</label>
            <input
              type="number"
              min="0"
              className="w-full rounded border p-2"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          {/* QUANTITY */}
          <div>
            <label className="mb-1 block font-medium">Quantity</label>
            <input
              type="number"
              min="0"
              className="w-full rounded border p-2"
              placeholder="Enter quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="mb-1 block font-medium">Description</label>
            <textarea
              rows="2"
              className="w-full rounded border p-2"
              placeholder="Enter product description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* PRODUCT IMAGE URL INPUT */}
          <div>
            <label className="mb-1 block font-medium">Product Image URL</label>
            <input
              type="text"
              className="w-full rounded border p-2"
              placeholder="Paste an image URL (optional)"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>
        </div>

        <button
          onClick={editingId === null ? addProduct : updateProduct}
          disabled={!isFormComplete}
          className="mt-4 rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:hover:bg-gray-400"
        >
          {editingId === null ? "Add Product" : "Update Product"}
        </button>

        {!isFormComplete && (
          <p className="mt-2 text-sm text-red-600">
            Please fill in all fields before saving.
          </p>
        )}
      </div>

      {/* SEARCH & FILTER SECTION */}
      <div className="mb-8 rounded-lg bg-white p-6 shadow">
        <h2 className="mb-4 text-xl font-bold">Search Product</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <div>
            <input
              type="text"
              className="w-full rounded border p-2"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div>
            <select
              className="w-full rounded border bg-white p-2"
              value={selectedCategoryFilter}
              onChange={(e) => setSelectedCategoryFilter(e.target.value)}
            >
              <option value="">All Categories</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <select
              className="w-full rounded border bg-white p-2"
              value={selectedPriceFilter}
              onChange={(e) => setSelectedPriceFilter(e.target.value)}
            >
              <option value="">All Prices</option>
              <option value="under1000">Under ₱1,000</option>
              <option value="1000to10000">₱1,000 - ₱10,000</option>
              <option value="above10000">Above ₱10,000</option>
            </select>
          </div>

          <div>
            <select
              className="w-full rounded border bg-white p-2"
              value={selectedQuantityFilter}
              onChange={(e) => setSelectedQuantityFilter(e.target.value)}
            >
              <option value="">All Quantities</option>
              <option value="low">Low Stock (&lt; 10)</option>
              <option value="normal">In Stock (10+)</option>
            </select>
          </div>
        </div>
      </div>

      {/* PRODUCT LIST HEADER */}
      <div className="mb-4">
        <h2 className="text-xl font-bold">Product List</h2>
      </div>

      {/* PRODUCT TABLE */}
      <div className="overflow-x-auto rounded-lg bg-white shadow">
        <table className="w-full">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Product</th>
              <th className="p-3 text-left">Description</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Quantity</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id} className="border-b">
                <td className="p-3">{product.id}</td>
                <td className="p-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-12 w-12 rounded object-cover border"
                  />
                </td>
                <td className="p-3">{product.name}</td>
                <td className="p-3">{product.description}</td>
                <td className="p-3">{product.category}</td>
                <td className="p-3">₱{product.price.toLocaleString()}</td>
                <td className="p-3">
                  <span className={product.quantity < 5 ? "font-bold text-red-600" : ""}>
                    {product.quantity}
                  </span>
                </td>
                <td className="p-3">
                  <button
                    onClick={() => editProduct(product)}
                    className="rounded bg-yellow-500 px-3 py-1 text-white hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="ml-2 rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {filteredProducts.length === 0 && (
              <tr>
                <td colSpan="8" className="p-4 text-center text-gray-500">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ABOUT MYSHOP SECTION */}
      <div className="mt-8 rounded-lg bg-white p-6 shadow">
        <h2 className="mb-2 text-xl font-bold">About MyShop</h2>
        <p className="text-gray-600">
          Welcome to MyShop! Your ultimate destination for top-quality electronics, trendy clothing, stylish accessories, everyday groceries, and home essentials. We are committed to providing you with reliable products and a seamless management experience.
        </p>
      </div>
    </div>
  )
}

export default App;