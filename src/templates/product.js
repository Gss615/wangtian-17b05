// 产品详情页面
import React from 'react';
import _, { map } from 'lodash';
import {graphql} from 'gatsby';

import {Layout} from '../components/index';
import {toStyleObj, withPrefix, Link, getPageByFilePath, getPages} from '../utils';

import BuyButton from '../components/BuyButton';
import ProductGrid from '../components/ProductGrid';
import Picture from '../components/Picture';
import ViewPicture from '../components/ViewPicture';

// this minimal GraphQL query ensures that when 'gatsby develop' is running,
// any changes to content files are reflected in browser
export const query = graphql`
  query($url: String) {
    sitePage(path: {eq: $url}) {
      id
    }
  }
`;

export default class Product extends React.Component {
    constructor(props){
        super(props)
        this.state={imgkey:0}

        this.handleClick = this.handleClick.bind(this)
    }
    handleClick(key){
        this.setState(prevState=>({imgkey:key}))
    }
    render() {
        let primary_bg_img_opacity_pct = _.get(this.props, 'pageContext.site.siteMetadata.bg_image_primary_opacity', null) || 100;
        let primary_bg_img_opacity = primary_bg_img_opacity_pct * 0.01;
        let singleTable = _.get(this.props,`pageContext.frontmatter.other1.table.single`,null);
        const features = _.get(this.props,'pageContext.frontmatter.other2.features')
        const link = _.get(this.props,`pageContext.frontmatter.other3`)
        const img = _.map(_.get(this.props, 'pageContext.frontmatter.other4.images'), (value, key) => {
            const result = { value, key}
            return result
         })[0];
        const imgurl = img ? `huawei/image/${img.key}/${img.value[this.state.imgkey]}`:'';
        return (
            <Layout {...this.props}>
                <main className="content">
                    <section className="product content__row content__row--full-width">
                        <div className="product__background-left">
                            {_.get(this.props, 'pageContext.site.siteMetadata.bg_image_primary', null) && (
                            <div className="product__background-left-img" style={toStyleObj('background-image: url(\'' + withPrefix(_.get(this.props, 'pageContext.site.siteMetadata.bg_image_primary', null)) + '\'); opacity: ' + primary_bg_img_opacity + ';')}/>
                            )}
                        </div>
                        {_.get(this.props, 'pageContext.site.siteMetadata.bg_image_secondary', null) && (
                        <div className="product__background-right" style={toStyleObj('background-image: url(\'' + withPrefix(_.get(this.props, 'pageContext.site.siteMetadata.bg_image_secondary', null)) + '\')')}/>
                        )}
                        <div className="product__header">
                            <Link to={withPrefix('/store')} className="product__back-to-store-link">
                                <svg width="20" height="10" viewBox="0 0 20 10" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2.739 4.309h17.011v1.284h-17.11l3.43 3.396-0.895 0.886-4.924-4.875 4.924-4.875 0.895 0.886-3.331 3.298z" />
                                </svg>
                                查看更多
                            </Link>
                        </div>
                        <figure className="product__figure">
                            <ViewPicture {...this.props} image={imgurl} alt={_.get(this.props, 'pageContext.frontmatter.title', null)} alt={_.get(this.props, 'pageContext.frontmatter.title', null)} cssClass={'product__image'} />
                        </figure>

                        {/* <figure className="product__figure">
                            <div className='detal_img'>
                                <PictureBig {...this.props} image={imgurl} alt={_.get(this.props, 'pageContext.frontmatter.title', null)} cssClass={'product__image'} />
                            </div>
                            <div className='thum-list'>
                                <ul className='item'>
                                    {_.map(img.value, (item, key) => {
                                        return <li key={key} className={this.state.imgkey === key ? 'img_active' : ''} onClick={() => this.handleClick(key)}><img src={`/huawei/image/${img.key}/${item}`} alt={key} /></li>
                                    })}
                                </ul>
                            </div>
                        </figure> */}
                        <div className="product__details">
                            <h1 className="product__title">
                                {_.get(this.props, 'pageContext.frontmatter.title', null)}
                            </h1>
                            {_.get(this.props, 'pageContext.frontmatter.category', null) && ((() => {
                                let category_page = getPageByFilePath(this.props.pageContext.pages, _.get(this.props, 'pageContext.frontmatter.category', null));
                                return (
                                    <h2 className="product__category">
                                        <Link to={withPrefix(_.get(category_page, 'url', null))}> {_.get(category_page, 'frontmatter.title', null)} </Link>
                                    </h2>
                                );
                            })())}
                            <article className="product__description">
                                {_.get(this.props, 'pageContext.frontmatter.description', null)}
                            </article>
                            <BuyButton {...this.props} product_page={this.props.pageContext} />
                        </div>
                    </section>
                    <section className='content__row features'>
                        {/* <h2>特性</h2> */}
                        {features?
                        <ul>
                            {features.map((item,key)=>{
                                return <li key={key}>
                                    <h3>{item.title}</h3>
                                    {item.dec.map((text,j)=>{
                                        return <p key={j}>{text}</p>
                                    })}
                                </li>
                            })}
                        </ul>:
                        null
                        }
                    </section>
                    <section className='content__row table'>
                        <h2>技术规格</h2>
                        {singleTable ? <div>
                            <table>
                                <thead>
                                    <tr>
                                        {_.head(singleTable).map(item => <td>{item.text}</td>)}
                                    </tr>
                                </thead>
                                <tbody>
                                    {_.slice(singleTable, 1).map(item => {
                                        return (<tr>
                                            {item.map((list) => <td rowSpan={list.row?list.row:1} colSpan={list.col?list.col:1}>{list.text.split('\n').map(text=>(<span>{text}<br></br></span>))}</td>)}
                                        </tr>)
                                    })}

                                </tbody>
                            </table>
                        </div> : (2)}
                            {link?<div className='table-btn'>
                                <button className='button button--std snipcart-add-item'><a href={link} target='_blank'>查看更多资料</a></button>
                            </div>:null}
                    </section>
                    {_.get(this.props, 'pageContext.frontmatter.category', null) && ((() => {
                        let product_pages = _.filter(_.orderBy(getPages(this.props.pageContext.pages, '/products'), 'frontmatter.order'), item => _.get(item, 'frontmatter.id') != _.get(this.props, 'pageContext.frontmatter.id', null));
                        let category_page = getPageByFilePath(this.props.pageContext.pages, _.get(this.props, 'pageContext.frontmatter.category', null));
                        return (
                            <section className="content__row">
                                <h2 className="content__row-title">Related</h2>
                                <ProductGrid {...this.props} product_pages={product_pages} category_url={_.get(category_page, 'url', null)} cssClass={'store__product-grid'} site={this.props.pageContext.site} />
                            </section>
                        );
                    })())}
                    <Link to={withPrefix('/store')} className="content__row content__row--full-width content__row--mb-0 product__back-to-store"{...(_.get(this.props, 'pageContext.site.siteMetadata.bg_image_product', null) ? ({style: toStyleObj('background-image: url(\'' + withPrefix(_.get(this.props, 'pageContext.site.siteMetadata.bg_image_product', null)) + '\')')}) : null)}>
                        <svg width="20" height="10" viewBox="0 0 20 10" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.739 4.309h17.011v1.284h-17.11l3.43 3.396-0.895 0.886-4.924-4.875 4.924-4.875 0.895 0.886-3.331 3.298z" />
                        </svg>
                        查看更多
                    </Link>
                </main>
            </Layout>
        );
    }
}
