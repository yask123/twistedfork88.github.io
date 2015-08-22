
import React from 'react';
import MasonryMixin from 'react-masonry-mixin';

var masonryOptions = {
    transitionDuration: 0
};

var MasonryGrid = React.createClass({

    mixins: [MasonryMixin('masonryContainer', masonryOptions)],

    render: function () {
        var childElements = this.props.elements.map(function(element){
           return (
                <div className="gridItem">
                    <p>{element.name}</p>
                    <p>{ element.content || "" }</p>
                </div>
            );
        });

        return (
            <div className='gridContainer' ref="masonryContainer">
                {childElements}
            </div>
        );
    }
});

module.exports = MasonryGrid;
