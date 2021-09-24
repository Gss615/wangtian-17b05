---
title: Home
white_header: true
sections:
  - type: hero_section
    section_id: hero_section
    background_image: images/header.jpg
    background_image_opacity: 65
    content: >-
      # 聚焦ICT管道和基础设施，为您提供云计算与数据中心

      企业网络、企业无线、统一通信与协作等服务
    actions:
      - title: 查看所有
        url: /store
        arrow: true

        style: primary
  - type: featured_products_section
    section_id: best_sellers_section
    title: 热门产品
    icon: true
    light_title: true
    featured_products: # 热门产品再次添加
      - src/pages/products/AD9431DN-24X万兆中心AP.md
  - type: featured_categories_section
    section_id: featured_categories_section
    featured_categories:
      # - src/pages/category/园区交换机.md
      - src/pages/category/安全.md
      - src/pages/category/路由器.md
      # - src/pages/category/网络监管&分析软件.md
      - src/pages/category/无线局域网.md
  - type: testimonials_section
    section_id: testimonials_section
    title: 客户评价
    testimonials:
      - author:
          name: 李先生
          location: '北京'
        text: >-
          省心、放心、可靠的合作体验。
      - author:
          name: 赵女士
          location: '上海'
        text: >-
          产品齐全，价格优惠，值得信赖。
  - type: promotion_section
    section_id: promotion_section
    title: A new home interior for summer
    subtitle: from $149.99
    image: images/promo.jpg
    background_image: images/leaf.svg
    cta:
      title: Discover
      url: /store
      style: secondary
      arrow: true
seo:
  title: 河南网田
  description: 专注华为产品
  extra:
    - name: 'og:type'
      value: website
      keyName: property
    - name: 'og:title'
      value: Planty Theme
      keyName: property
    - name: 'og:description'
      value: The preview of the Planty theme
      keyName: property
    - name: 'og:image'
      value: images/header.jpg
      keyName: property
      relativeUrl: true
    - name: 'twitter:card'
      value: summary_large_image
    - name: 'twitter:title'
      value: Planty Theme
    - name: 'twitter:description'
      value: The preview of the Planty theme
    - name: 'twitter:image'
      value: images/header.jpg
      relativeUrl: true
template: home
---
