// Content.js

import React from 'react';

function Content({ filteredData, currentPageId }) {
  return (
    <div className="data-container">
      <h3>Data</h3>
      {filteredData.length > 0 ? (
        <ul>
          {filteredData.map((item, index) => (
            <li key={index}>
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                <img src={item.thumbnail} alt="Thumbnail" />
                <h4>{item.title}</h4>
                <p>{item.displayed_link}</p>
                {item.result_type === "video_results" && (
                  <>
                    <p>{item.platform} {item.channel}</p>
                    {item.favicon && (
                      <img src={item.favicon} alt="Favicon" />
                    )}
                  </>
                )}
                {item.result_type === "shopping_result" && (
                  <>
                    {item.price && <p>Price: {item.price}</p>}
                    {item.favicon && (
                      <img src={item.favicon} alt="Favicon" />
                    )}
                  </>
                )}
                {item.result_type === "inline_product" && (
                  <>
                    {item.price && <p>Price: {item.price}</p>}
                    {item.currency && <p>Currency: {item.currency}</p>}
                    {item.favicon && (
                      <img src={item.favicon} alt="Favicon" />
                    )}
                  </>
                )}
                {item.result_type === "organic" && (
                  <>
                    {item.favicon && (
                      <img src={item.favicon} alt="Favicon" />
                    )}
                    {item.rich_snippet && (
                      <p>Rich Snippet: {item.rich_snippet}</p>
                    )}
                  </>
                )}
                {item.snippet && <p>{item.snippet}</p>}
                {item.source && <p>{item.source}</p>}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found for Page {currentPageId}.</p>
      )}
    </div>
  );
}

export default Content;
