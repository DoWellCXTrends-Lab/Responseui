// Sidebar.js

import React, { useState } from 'react';
import organicData from './data.json'; // Import your JSON data file

function Sidebar() {
  const [expandedPage, setExpandedPage] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPageId, setCurrentPageId] = useState(null);

  const togglePage = (pageId) => {
    if (expandedPage === pageId) {
      setExpandedPage(null);
      setFilteredData([]); // Clear the filtered data when collapsing a page
    } else {
      setExpandedPage(pageId);
      setCurrentPageId(pageId); // Set the current page's ID
    }
  };

  const toggleSubmenu = (submenu) => {
    if (submenu === 'Organic' && currentPageId !== null) {
      // Filter and set the relevant data based on the current page's ID
      const organicResults = organicData.filter(
        (item) => item["﻿Page ID"] === `${currentPageId}` && item.result_type === "organic"
      );
      setFilteredData(organicResults);
    } else if (submenu === 'Shopping Result' && currentPageId === 1) {
      // Display shopping result only when on Page 1
      const shoppingResult = organicData.filter(
        (item) => item["﻿Page ID"] === "1" && item.result_type === "shopping_result"
      );
      setFilteredData(shoppingResult);
    } else if (submenu === 'Inline Product' && currentPageId === 1) {
      // Display inline_product result only when on Page 1
      const inlineProductResult = organicData.filter(
        (item) => item["﻿Page ID"] === "1" && item.result_type === "inline_product"
      );
      setFilteredData(inlineProductResult);
    } else if (submenu === 'Immersive Product' && currentPageId === 1) {
      // Display immersive_product result only when on Page 1
      const immersiveProductResult = organicData.filter(
        (item) => item["﻿Page ID"] === "1" && item.result_type === "immersive_product"
      );
      setFilteredData(immersiveProductResult);
    } else {
      setFilteredData([]); // Clear the filtered data when submenu is not "Organic," "Shopping Result," "Inline Product," or not on Page 1
    }
  };

  const getResponseSubmenus = () => {
    // Define a function to generate response submenus based on filtered data
    const responseSubmenus = [];

    filteredData.forEach((item, index) => {
      if (item.position) {
        const submenuName = `Response ${item.position}`;

        responseSubmenus.push(
          <li
            key={submenuName}
            className="submenu"
            onClick={() => handleResponseClick(item)}
          >
            {submenuName}
          </li>
        );
      }
    });

    return responseSubmenus;
  };

  const handleResponseClick = (selectedResponse) => {
    // Handle click on response submenu to display the specific data
    setFilteredData([selectedResponse]);
  };

  const pages = Array.from({ length: 17 }, (_, index) => ({
    id: index + 1,
    title: `Page ${index + 1}`,
    submenus: index === 0
      ? ['Organic', 'Shopping Result', 'Inline Product', 'Immersive Product', 'Related Searches']
      : ['Organic', 'Related Searches'],
  }));

  return (
    <div className="container">
      <div className="sidebar">
        {pages.map((page) => (
          <div key={page.id}>
            <div
              className={`page ${expandedPage === page.id ? 'expanded' : ''}`}
              onClick={() => togglePage(page.id)}
            >
              {page.title}
            </div>
            {expandedPage === page.id && (
              <ul className="submenus">
                {page.submenus.map((submenu, subIndex) => (
                  <li
                    key={subIndex}
                    className="submenu"
                    onClick={() => toggleSubmenu(submenu)}
                  >
                    {submenu}
                  </li>
                ))}
              </ul>
            )}
            {expandedPage === page.id && filteredData.length > 0 && (
              <ul className="response-submenus">
                {getResponseSubmenus()}
              </ul>
            )}
          </div>
        ))}
      </div>

      <div className="data-container">
        <h3>Data</h3>
        {filteredData.length > 0 ? (
          <ul>
            {filteredData.map((item, index) => (
              <li key={index}>
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  <h4>{item.title}</h4>
                  <p>{item.displayed_link}</p>
                  {item.result_type === "shopping_result" && (
                    <>
                      <p>Price: {item.price}</p>
                      <img src={item.thumbnail} alt="Thumbnail" />
                    </>
                  )}
                  {item.result_type === "organic" && (
                    <img src={item.thumbnail} alt="Thumbnail" />
                  )}
                  {item.result_type === "video_results" && (
                    <img src={item.thumbnail} alt="Thumbnail" />
                  )}
                  {item.result_type === "inline_product" && (
                    <img src={item.thumbnail} alt="Thumbnail" />
                  )}
                  {item.result_type === "related_searches" && (
                    <>
                      <a href={item.link} target="_blank" rel="noopener noreferrer">
                        {item.query}
                      </a>
                    </>
                  )}
                  <p>{item.snippet}</p>
                  <p>{item.source}</p>
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p>No results found for Page {currentPageId}.</p>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
