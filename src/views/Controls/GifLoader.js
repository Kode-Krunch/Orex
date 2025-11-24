
import React from 'react';


function GifLoader({ showgifLoader, icon }) {
    return (
        <>
            {showgifLoader ? (
                <div className="dialog-overlay flex justify-center items-center z-50">
                    {icon}
                </div>
            ) : (
                <></>
            )}
        </>
    );
}

export default GifLoader;
