import React from 'react';
import _ from 'lodash';

import { getPageByFilePath} from '../utils';

export default class BuyButton extends React.Component {
    render() {
        let product_page = _.get(this.props, 'product_page', null);
        return (
            <a className="button button--std snipcart-add-item"
                target="_blank" 
                href="http://wpa.qq.com/msgrd?v=3&uin=211837069&site=qq&menu=false"
                data-item-name={_.get(product_page, 'frontmatter.title', null)}
                data-item-url={_.get(product_page, 'url', null)}
                data-item-price={_.get(product_page, 'frontmatter.price', null)}
                rel="noreferrer"
                // {...(_.get(product_page, 'frontmatter.default_thumbnail_image', null) ? ({"data-item-image": withPrefix(_.get(product_page, 'frontmatter.default_thumbnail_image', null))}) : null)}
                // data-item-description={_.get(product_page, 'frontmatter.description', null)}
                {...(_.get(product_page, 'frontmatter.category', null) ? ((() => {
                    let category_page = getPageByFilePath(this.props.pageContext.pages, _.get(product_page, 'frontmatter.category', null));
                    return ({"data-item-categories": _.get(category_page, 'frontmatter.title', null)});
                })()) : null)}
                data-item-id={_.get(product_page, 'frontmatter.id', null)}>
                <span className="button__text">
                    在线询价
                </span>
            </a>
        );
    }
}
