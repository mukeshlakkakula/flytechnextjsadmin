"use client";

import { useState } from "react";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import { useRouter } from "next/navigation";

const Sidebar = () => {
  const [openMenu, setOpenMenu] = useState({});
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeSubcategory, setActiveSubcategory] = useState(null);
  const router = useRouter();

  const toggleMenu = (menuKey) => {
    setOpenMenu((prev) => ({
      ...prev,
      [menuKey]: !prev[menuKey],
    }));
  };

  const navigateTo = (path) => {
    router.push(path);
  };

  const menus = [
    {
      name: "Product Management",
      submenus: [
        {
          name: "Add Product",
          path: "/add-product",
          categories: [
            {
              name: "Fashion",
              subcategories: [
                {
                  name: "Men's Top Wear",
                  path: "/ProductManagement/AddProduct/Fashion/MensTopWear",
                },
                {
                  name: "Men's Bottom Wear",
                  path: "/ProductManagement/AddProduct/Fashion/MensBottomWear",
                },
              ],
            },
            {
              name: "Mobiles",
              path: "/ProductManagement/AddProduct/Mobiles",
              subcategories: [],
            },
          ],
        },
        {
          name: "Update Product",
          path: "/update-product",
          categories: [
            {
              name: "Fashioned",
              subcategories: [
                {
                  name: "Men's Top Weared",
                  path: "/ProductManagement/AddProduct/Fashion/MensTopWear",
                },
                {
                  name: "Men's Bottom Weared",
                  path: "/ProductManagement/AddProduct/Fashion/MensBottomWear",
                },
              ],
            },
            {
              name: "Mobiles",
              path: "/ProductManagement/AddProduct/Mobiles",
              subcategories: [],
            },
          ],
        },
        { name: "Add Special Product", path: "/add-special-product" },
        { name: "Update Special Product", path: "/update-special-product" },
      ],
    },
    {
      name: "Order Management",
      submenus: [
        { name: "View Orders", path: "/view-orders" },
        { name: "Update Order Status", path: "/update-order-status" },
      ],
    },

    // Add other menus here as needed
  ];

  return (
    <aside className="w-64 bg-gray-100 text-gray-800 h-screen p-4 overflow-auto no-scrollbar shadow-lg">
      <ul className="space-y-2">
        {menus.map((menu, index) => (
          <li key={index} className="p-2 cursor-pointer">
            <div
              onClick={() => toggleMenu(menu.name)}
              className="flex justify-between items-center text-gray-700 hover:text-gray-900"
            >
              <span>{menu.name}</span>
              {openMenu[menu.name] ? <FiChevronDown /> : <FiChevronRight />}
            </div>

            {openMenu[menu.name] && (
              <ul className="pl-2 mt-2 text-sm space-y-1 text-gray-600">
                {menu.submenus.map((submenu, subIndex) => (
                  <li key={subIndex} className="py-1 cursor-pointer">
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleMenu(submenu.name);
                      }}
                      className="flex justify-between items-center hover:text-gray-800"
                    >
                      <span>{submenu.name}</span>
                      {openMenu[submenu.name] ? (
                        <FiChevronDown />
                      ) : (
                        <FiChevronRight />
                      )}
                    </div>

                    {openMenu[submenu.name] && submenu.categories && (
                      <ul className="pl-3 mt-1 space-y-1 text-gray-500">
                        {submenu.categories.map((category, catIndex) => (
                          <li
                            key={catIndex}
                            className={`py-1 cursor-pointer`}
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveCategory(category.name);
                              setActiveSubcategory(null); // Reset subcategory selection
                              if (category.subcategories.length === 0) {
                                navigateTo(category.path);
                              } else {
                                toggleMenu(`category${catIndex}`);
                              }
                            }}
                          >
                            <div
                              className={`flex justify-between items-center rounded p-1 ${
                                activeCategory === category.name
                                  ? "bg-blue-300 text-blue-900"
                                  : "hover:bg-blue-100 hover:text-blue-700"
                              }`}
                            >
                              <span>{category.name}</span>
                              {category.subcategories.length > 0 &&
                                (openMenu[`category${catIndex}`] ? (
                                  <FiChevronDown />
                                ) : (
                                  <FiChevronRight />
                                ))}
                            </div>

                            {category.subcategories.length > 0 &&
                              openMenu[`category${catIndex}`] && (
                                <ul className="pl-4 mt-1 space-y-1 text-gray-500">
                                  {category.subcategories.map(
                                    (subcategory, subIndex) => (
                                      <li
                                        key={subIndex}
                                        className={`py-1 cursor-pointer rounded-md p-1 ${
                                          activeSubcategory === subcategory.name
                                            ? "bg-blue-200 text-blue-800"
                                            : "hover:bg-blue-100 hover:text-blue-700"
                                        }`}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setActiveCategory(category.name);
                                          setActiveSubcategory(
                                            subcategory.name
                                          );
                                          navigateTo(subcategory.path);
                                        }}
                                      >
                                        {subcategory.name}
                                      </li>
                                    )
                                  )}
                                </ul>
                              )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
