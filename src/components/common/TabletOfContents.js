import React from 'react';
import Chapter from './Chapter';

const TabletOfContents = ({data, type}) => {
    return (
        <div className="listcolumn">
            {data.map((item, index) => {
                return (
                    <Chapter data={item} type={type}></Chapter>
                );
            })}
        </div>
    );
};

export default TabletOfContents;