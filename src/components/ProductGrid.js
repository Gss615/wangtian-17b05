import React from 'react';
import _ from 'lodash';

import ProductGridItem from './ProductGridItem';
import {getPageByFilePath} from '../utils';

export default class ProductGrid extends React.Component {
    render() {
        let site = _.get(this.props, 'site', null);
        let product_pages = _.get(this.props, 'product_pages', null);
        let listCssClass = _.get(this.props, 'cssClass', null);
        let category_url = _.get(this.props, 'category_url', null);
        let realList = category_url ? _.filter(product_pages,(product_page)=>{
            let category_page = getPageByFilePath(this.props.pageContext.pages, _.get(product_page, 'frontmatter.category', null));

            return _.get(product_page, 'frontmatter.category', null) &&  (category_url === _.get(category_page, 'url', null))
        }):[]
        realList = _.take(realList,8)
        // console.log('product_pages',product_pages,category_url,this.props)
        // return (<h1>123</h1>)
        return (
            <ul className={'product-grid ' + (listCssClass ? (listCssClass) : '')}>
                {_.map(realList, (product_page, product_page_idx) => (
                    (!category_url) ? (
                        <ProductGridItem key={product_page_idx} {...this.props} product_page={product_page} site={site} />
                    ) : 
                        _.get(product_page, 'frontmatter.category', null) && ((() => {
                            let category_page = getPageByFilePath(this.props.pageContext.pages, _.get(product_page, 'frontmatter.category', null));
                            return (
                                (category_url === _.get(category_page, 'url', null)) && (
                                    <ProductGridItem key={product_page_idx + '.1'} {...this.props} product_page={product_page} site={site} />
                                )
                            );
                        })())
                ))}
            </ul>
        );
    }
   
}
