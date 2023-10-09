// Content.js

import React from 'react';
import './Content.css';
function Content({ filteredData, currentPageId, showData }) {
  console.log(showData,'========showData=============')
  const countKeyMoments = (keyMoments) => {
    try {
      const keyMomentsArray = JSON.parse(keyMoments.replace(/'/g, '"'));
      return Array.isArray(keyMomentsArray) ? keyMomentsArray.length : 0;
    } catch (error) {
      return "";
    }
  };
  return (
    <div className="data-container">
      <h5>Data </h5>

      {showData?.length > 0 ? (
        <ul>
          {showData?.map((item, index) => (
            <li key={index}>
              <a href={item.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                {item.result_type === "organic" && (
                  <>
                    <div className='row'>
                      <div className='col-md-1 cust-width' >
                        {item.favicon && (
                          <img src={item.favicon} alt="Favicon" className='cust-fav-img' width={25} />
                        )}
                      </div>
                      <div className='col-md-11'>
                        <img src={item.thumbnail} alt="Thumbnail" style={{ float: 'right', marginLeft: '10px', marginRight: '10px' }} />
                        {item.source && <p className='cust-font-title'>{item.source}</p>}
                        <p className='cust-md-text cust-font-size'>{item.displayed_link}</p>
                        <p className='cust-heading' >{item.title}</p>
                        <p className='cust-margin-top'>
                          {item.snippet && <p>{item.snippet}</p>}
                        </p>
                      </div>
                    </div>
                  </>
                )}


              </a>

            </li>
          ))}

        </ul>
      ) : (
        <p>No results found for Page {currentPageId}.</p>
      )}

      {showData?.length > 0 ? (
        <div className="container" >
          {showData?.map((item, index) => (
            <div key={index} style={{ padding: '12px' }}>
              {
                (item.result_type === "shopping_result" || item.result_type === "inline_product") && (
                  <>
                    <div className='card' style={{ width: '200px', height: '325px' }}>
                      <div className=''>
                        <div style={{ height: '160px' }}>
                          <img src={item.thumbnail} alt="Thumbnail" style={{ width: '100%', marginLeft: '10px', marginRight: '10px' }} />
                        </div>
                        <div className='card-title'> <p className='cust-heading cust-subHeadingText' >
                          {item.title}</p>
                          {item.price && <p>{item.currency}{item.price}</p>}
                          {item.source && <p className='cust-font-title'>{item.source}</p>}
                        </div>
                      </div>
                    </div>
                  </>
                )
              }
            </div>
          ))}
        </div>
      ) : (
        <p>No results found for Page {currentPageId}.</p>
      )}

      {showData?.length > 0 ? (
        <div className="row" >
          {showData?.map((item, index) => (
            <div key={index}>
              {
                (item.result_type === "video_results") && (
                  <>
                    <div className='card ' style={{ width: '100%', }}>
                      <div className='row'>

                        <div className='col-md-3' style={{ width: '20%' }}>
                          <img src={item.thumbnail} alt="Thumbnail" style={{ width: '100%', marginLeft: '10px', marginRight: '10px', borderRadius: '8px' }} />
                        </div>
                        <div className='col-md-8'>
                          <div className='row col-md-12'>
                            <p className='cust-heading cust-subHeadingText' >
                              <a href='#' style={{ fontSize: '16px' }}>{item.title}</a></p>
                          </div>
                          <div className='row col-md-12'>
                            <p className='cust-heading cust-subHeadingText' style={{ fontSize: '14px', display: 'flex', alignItems: 'end' }}>
                              {item.platform} . {item.channel} <br/>{item.date}</p>
                          </div>
                        </div>
                        {countKeyMoments(item.key_moments) > 0 && item.thumbnail &&(
                        <div style={{display:'flex',paddingLeft:'25px'}}><img src={item.thumbnail} alt="Thumbnail" style={{ width: '4%'}} /> <span style={{paddingLeft:'20px', paddingTop:'10px'}}>{countKeyMoments(item.key_moments)} key moments in this video</span></div>)}
                      </div>
                    </div>
                  </>
                )
              }
            </div>


          ))}
        </div>




      ) : (
        <p>No results found for Page {currentPageId}.</p>
      )}

      {showData?.length > 0 ? (

        <div className="containerM" style={{marginTop:'-25px', width:'600px'}}>
          {showData?.map((item, index) => (
            <div key={index} >
              {
                item.result_type === 'related_searches' ? (
                  <>
                  
                      <div style={{padding:'10px',borderRadius:'25px', background:'#f1f2f3', marginBottom:'10px'}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                        </svg> <span style={{paddingLeft:'15px'}}>{item.query}</span>

                      </div>
                  
                  </>
                ) : (
                  <>
                  </>
                )
              }
            </div>
          ))}
        </div>
      ) : (
        <p>No results found for Page {currentPageId}.</p>
      )}


    </div>

  );
}

export default Content;
