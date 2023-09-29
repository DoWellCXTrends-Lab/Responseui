// Sidebar.js

import React, { useState } from 'react';
import organicData from './data.json'; // Import your JSON data file
import Content from './Content';

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
    } else if (submenu === 'Videos' && currentPageId === 1) {
      // Display immersive_product result only when on Page 1
      const videoResults = organicData.filter(
        (item) => item["﻿Page ID"] === "1" && item.result_type === "video_results"
      );
      setFilteredData(videoResults);
    } else if (submenu === 'Related Searches') {
      // Filter and set the relevant data for Related Searches
      const relatedSearches = organicData.filter(
        (item) => item["﻿Page ID"] === `${currentPageId}` && item.result_type === "related_searches"
      ); // Extract only the "query" property
      setFilteredData(relatedSearches);
    } else {
      setFilteredData([]); // Clear the filtered data when submenu is not "Organic," "Shopping Result," "Inline Product," "Videos," or not on Page 1
    }
  };

  const getResponseSubmenus = () => {
    // Group the filtered data by position and find the maximum position
    const groupedData = filteredData.reduce((acc, item) => {
      const position = parseInt(item.position);
      if (!acc[position]) {
        acc[position] = [];
      }
      acc[position].push(item);
      return acc;
    }, {});

    const maxPosition = Object.keys(groupedData).reduce((max, position) => {
      return Math.max(max, parseInt(position));
    }, 0);

    // Generate response submenus based on the maximum position
    const responseSubmenus = [];
    for (let i = 1; i <= maxPosition; i++) {
      const submenuName = `Response ${i}`;
      responseSubmenus.push(
        <li key={submenuName} className="submenu" onClick={() => handleResponseClick(groupedData[i])}>
          {submenuName}
        </li>
      );
    }

    return responseSubmenus;
  };

  const handleResponseClick = (selectedResponses) => {
    // Handle click on response submenu to display the specific data
    setFilteredData(selectedResponses);
  };

  const pages = Array.from({ length: 17 }, (_, index) => ({
    id: index + 1,
    title: `Page ${index + 1}`,
    submenus: index === 0
      ? ['Organic', 'Shopping Result', 'Inline Product', 'Videos', 'Related Searches']
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

      <Content filteredData={filteredData} currentPageId={currentPageId} /> {/* Render the Content component */}
    </div>
  );
}

export default Sidebar;
