// Content.js

import React from 'react';

function Card({ item }) {
  return (
    <div className="card">
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
    </div>
  );
}

function Content({ filteredData, currentPageId }) {
  return (
    <div className="data-container">
      <h3>Data</h3>
      {filteredData.length > 0 ? (
        <div className="card-container">
          {filteredData.map((item, index) => (
            <Card key={index} item={item} />
          ))}
        </div>
      ) : (
        <p>No results found for Page {currentPageId}.</p>
      )}
    </div>
  );
}

export default Content;
