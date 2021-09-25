---
id: '1'
price: '49.40'
title: iMaster NCE-Fabric
description:  'iMaster NCE-Fabric控制器是华为CloudFabric云数据中心网解决方案的核心组件，可实现对网络资源的统一控制和动态调度，快速部署云业务。华为CloudFabric云数据中心网解决方案为客户提供极简网络部署、智能化网络运维、超宽互联和开放生态的下一代数据中心网络，支持企业云业务高速发展。

iMaster NCE-Fabric采用开放架构，开放丰富的标准接口，北向支持与业界主流OpenStack云平台实现L2~L7层对接，南向支持管理物理交换机、虚拟交换机、防火墙等物理和虚拟网络设备。iMaster NCE-Fabric通过北向接口接收以用户为中心的业务诉求，并将其转换为网络配置、批量下发，实现网络自动化。在没有云平台的场景下，iMaster NCE-Fabric提供独立业务发放GUI。

iMaster NCE-Fabric提供高可靠集群能力，系统采用负载分担方式对南北向业务进行处理，同时支持主备集群部署，实现异地容灾，满足数据中心业务的高可靠性要求。'
featured: true
order: 190
category: src/pages/category/网络管控&分析软件.md
other1: 
  table: {"single":[[{"row":null,"col":null,"text":"特性"},{"row":null,"col":null,"text":"描述"}],[{"row":null,"col":null,"text":"Zero Touch Provisioning "},{"row":null,"col":null,"text":"支持iMaster NCE-Fabric自动识别和纳管设备，实现Underlay网络自动化部署\n"}],[{"row":null,"col":null,"text":"网络业务发放"},{"row":null,"col":null,"text":"提供与业界主流OpenStack云平台或第三方APP实现L2~L7层对接，由云平台或第三方APP通过标准接口调用，完成网络业务发放\n提供由iMaster NCE-Fabric独立完成网络业务发放（含与计算平台联动），实现网络的自动化部署"}],[{"row":null,"col":null,"text":"Fabric管理"},{"row":null,"col":null,"text":"支持业界标准的VxLAN协议，通过iMaster NCE-Fabric实现网络的自动化部署，包括VXLAN协议封装，VxLAN二层互通、三层互通、以及VXLAN和传统网络互通\n支持丰富的VxLAN组网场景，具备管控软硬件网络设备的能力\n支持不同场景下物理服务器、虚拟机、裸金属机等多类型终端混合接入"}],[{"row":null,"col":null,"text":"业务链"},{"row":null,"col":null,"text":"支持IETF标准的服务链（SFC）模型，采用标准PBR或NSH技术，根据用户预配置策略自动引导业务流量到不同的服务节点上进行相关增值服务处理，实现拓扑无关的、图形化编排的、动态配置的业务链能力\n支持增值服务包括安全策略、NAT、IPSec VPN等"}],[{"row":null,"col":null,"text":"网络安全"},{"row":null,"col":null,"text":"支持微分段，基于更加精细的分组，如子网、IP、VM名、宿主机名等，实施安全隔离\n支持基于角色的访问控制，实现多租户间的隔离和多用户账户和权限的管理\n支持基于密码的本地认证，及Radius、AD等安全用户认证"}],[{"row":null,"col":null,"text":"运维与故障定位"},{"row":null,"col":null,"text":"支持监控物理资源、逻辑资源、租户资源等\n支持应用/逻辑/物理三层网络拓扑互视：可分别展示应用/逻辑/物理三层网络拓扑，并支持从应用到逻辑、逻辑到物理拓扑的映射关系展示\n支持真实转发路径探测：基于VM和VTEP的转发路径展示，实现逻辑到物理网络精确定位\n支持环路智能检测：对可能的环路进行检测，并提供一键式修复\n支持连通性检测：通过IP Ping和MAC Ping，检测VM之间、VM与外部网络的二三层连通性，协助故障快速定位\n支持流量镜像（将VM/BM的流量通过GRE隧道镜像到远端地址）"}],[{"row":null,"col":null,"text":"可靠性"},{"row":null,"col":null,"text":"iMaster NCE-Fabric采用分布式集群部署，单集群最大可扩展到128成员节点，业务控制节点支持动态扩展，扩展时业务不中断\n\n\n集群成员既支持在同一二层网络内部署，也支持跨三层部署，保证群集成员之前路由可达即可\n集群具备北向负载均衡能力，接受云平台API主动请求或Web访问时，会将请求发送到不同的集群成员节点上\n集群具备南向负载均衡能力，全数据中心网络设备被均匀分配，由不同的集群成员节点负责管理。其中一个成员节点发生故障时，它所管理的网络设备可平滑迁移到其他正常运行成员节点上，保证管理业务不中断\n\niMaster NCE-Fabric支持主、备集群部署，实现高可靠异地容灾"}],[{"row":null,"col":null,"text":"开放性"},{"row":null,"col":null,"text":"iMaster NCE-Fabric基于ONOS、兼容ODL架构设计\n北向支持Restful、RestConf、WebService、Syslog等接口，支持与业界主流OpenStack平台（标准OpenStack、RedHat、Mirantis、UnitedStack等）实现L2~L7层对接\n南向支持SNMP、NetConf、OpenFlow（1.3/1.4）、OVSDB、JSON-RPC、sFlow等协议，与物理和虚拟网络设备对接\n东西向支持与计算资源管理系统如VMWare vCenter、Microsoft System Center对接，实现网络与计算资源协同"}],[{"row":null,"col":null,"text":"管理容量与性能"},{"row":null,"col":null,"text":"典型配置（3节点）\n\n\n管理物理网络设备数量：1,800台\n管理物理服务器数量：9,000台\n管理VM数量：180,000台\nVM上线速率：200个/秒\n\n典型配置（5节点）\n\n\n管理物理网络设备数量：3,000台\n管理物理服务器数量：15,000台\n管理VM数量：300,000台\nVM上线速率：350个/秒"}]]}
other2:
  features: [{"title":"网络E2E自动部署","dec":["",""]},{"title":"网络仿真及校验","dec":["",""]},{"title":"故障1-3-5闭环","dec":["",""]}]
other3: null
other4:
  images: {"other":{"org":"other","img":["iMaster NCE-Fabric.png"]}}
seo:
  title: imaster-nce-fabric | iMaster NCE-Fabric | null | 数据中心自动驾驶网络管理控制系统 | 网络管控&分析软件 | 企业网络
  description: 'iMaster NCE-Fabric控制器是华为CloudFabric云数据中心网解决方案的核心组件，可实现对网络资源的统一控制和动态调度，快速部署云业务。华为CloudFabric云数据中心网解决方案为客户提供极简网络部署、智能化网络运维、超宽互联和开放生态的下一代数据中心网络，支持企业云业务高速发展。

iMaster NCE-Fabric采用开放架构，开放丰富的标准接口，北向支持与业界主流OpenStack云平台实现L2~L7层对接，南向支持管理物理交换机、虚拟交换机、防火墙等物理和虚拟网络设备。iMaster NCE-Fabric通过北向接口接收以用户为中心的业务诉求，并将其转换为网络配置、批量下发，实现网络自动化。在没有云平台的场景下，iMaster NCE-Fabric提供独立业务发放GUI。

iMaster NCE-Fabric提供高可靠集群能力，系统采用负载分担方式对南北向业务进行处理，同时支持主备集群部署，实现异地容灾，满足数据中心业务的高可靠性要求。'
  extra:
    - name: 'og:type'
      value: website
      keyName: property
    - name: 'og:title'
      value: 河南网田
      keyName: property
    - name: 'og:description'
      value: 'iMaster NCE-Fabric控制器是华为CloudFabric云数据中心网解决方案的核心组件，可实现对网络资源的统一控制和动态调度，快速部署云业务。华为CloudFabric云数据中心网解决方案为客户提供极简网络部署、智能化网络运维、超宽互联和开放生态的下一代数据中心网络，支持企业云业务高速发展。

iMaster NCE-Fabric采用开放架构，开放丰富的标准接口，北向支持与业界主流OpenStack云平台实现L2~L7层对接，南向支持管理物理交换机、虚拟交换机、防火墙等物理和虚拟网络设备。iMaster NCE-Fabric通过北向接口接收以用户为中心的业务诉求，并将其转换为网络配置、批量下发，实现网络自动化。在没有云平台的场景下，iMaster NCE-Fabric提供独立业务发放GUI。

iMaster NCE-Fabric提供高可靠集群能力，系统采用负载分担方式对南北向业务进行处理，同时支持主备集群部署，实现异地容灾，满足数据中心业务的高可靠性要求。'
      keyName: property
    - name: Robots
      value: all
template: product
---

# Nulla suscipit

Aliquam quis laoreet lectus. Proin non mattis nulla, quis posuere mi. Mauris venenatis, magna at pellentesque commodo, lectus risus vehicula elit, nec dignissim nisl sapien id leo. Nulla non pretium metus, vitae finibus lectus. Aliquam in posuere risus. Curabitur ultrices ornare magna porttitor commodo. Curabitur eu tempor orci, sed pretium quam. Vestibulum condimentum, arcu nec pulvinar fringilla, lorem odio varius arcu, in porta tellus eros sed neque. Suspendisse efficitur eget erat sit amet efficitur. Proin maximus nibh eu sapien consequat, non porttitor risus consequat. Donec maximus odio sed nibh convallis luctus.