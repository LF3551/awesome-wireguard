# Awesome WireGuard [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

A curated, link-checked list of WireGuard and Tailscale tools: mesh VPNs such as Tailscale, Headscale, NetBird and Netmaker, self-hosted servers with web UIs, clients, installers, deployment tooling, guides and services.

[![Link check](https://github.com/LF3551/awesome-wireguard/actions/workflows/links.yml/badge.svg)](https://github.com/LF3551/awesome-wireguard/actions/workflows/links.yml)

112 entries, each checked on 2026-10-28. Links are re-checked every week, and projects without a commit for 18 months move to a separate section.

[WireGuard](https://www.wireguard.com/) is a fast, modern VPN protocol built into the Linux kernel since version 5.6. It is a point-to-point tunnel: you create keys and configs yourself. Tools in this list add what plain WireGuard leaves out: web UIs, access control, NAT traversal and mesh networking.

## Contents

- [Choosing a tool](#choosing-a-tool)
- [Official resources](#official-resources)
- [Mesh VPNs built on WireGuard](#mesh-vpns-built-on-wireguard)
- [Tailscale ecosystem](#tailscale-ecosystem)
- [Overlay and zero-trust networks beyond WireGuard](#overlay-and-zero-trust-networks-beyond-wireguard)
- [Self-hosted servers and web UIs](#self-hosted-servers-and-web-uis)
- [Installers and config generators](#installers-and-config-generators)
- [Tools and libraries](#tools-and-libraries)
- [Desktop clients](#desktop-clients)
- [Deployment](#deployment)
- [Implementations](#implementations)
- [Services built on WireGuard](#services-built-on-wireguard)
- [Guides and articles](#guides-and-articles)
- [Talks and videos](#talks-and-videos)
- [Communities](#communities)
- [Inactive projects](#inactive-projects)
- [FAQ](#faq)

## Choosing a tool

| If you want                                    | Look at                         | Built on       | Control plane                     |
| ---------------------------------------------- | ------------------------------- | -------------- | --------------------------------- |
| One server and a few peers, full control       | wg-quick                        | WireGuard      | None, you manage keys and configs |
| A server you manage from a browser             | wg-easy, WGDashboard, wg-portal | WireGuard      | Web UI on your server             |
| A mesh that works with no setup                | Tailscale                       | WireGuard      | Hosted by Tailscale               |
| Tailscale clients with your own control server | Headscale                       | WireGuard      | Self-hosted, open source          |
| An open-source mesh with SSO                   | NetBird                         | WireGuard      | Self-hosted or NetBird cloud      |
| Automated WireGuard networks you host          | Netmaker                        | WireGuard      | Self-hosted                       |
| WireGuard access with SSO and 2FA              | Defguard                        | WireGuard      | Self-hosted                       |
| A large overlay with your own CA               | Nebula                          | Noise protocol | You run the lighthouses           |
| Virtual Ethernet networks                      | ZeroTier                        | Own protocol   | Hosted or self-hosted controllers |

For a deeper comparison of plain WireGuard and Tailscale, see the guides below.

## Official resources

- [WireGuard whitepaper](https://www.wireguard.com/papers/wireguard.pdf) - Whitepaper by Jason A. Donenfeld.
- [Quick Start](https://www.wireguard.com/quickstart/) - Official WireGuard quick start.
- [wg-quick](https://git.zx2c4.com/wireguard-tools/about/src/man/wg-quick.8) - Official cross-platform tool to set up a WireGuard interface simply.
- [WireGuard Docs](https://github.com/pirate/wireguard-docs) - Unofficial but comprehensive WireGuard documentation.
- [Presentations by Jason A. Donenfeld](https://www.wireguard.com/presentations/) - Presentations by WireGuard author Jason A. Donenfeld.

## Mesh VPNs built on WireGuard

Tools that connect many devices into one private network and handle keys, NAT traversal and access rules for you.

- [Headscale](https://github.com/juanfont/headscale) - Open-source, self-hosted implementation of the Tailscale control server.
- [innernet](https://github.com/tonarino/innernet) - Private network system built on WireGuard, similar in goals to Nebula and Tailscale.
- [Kilo](https://github.com/squat/kilo) - Multi-cloud network overlay built on WireGuard and designed for Kubernetes.
- [NetBird](https://github.com/netbirdio/netbird) - Open-source zero-trust networking platform built on WireGuard, self-hostable or cloud.
- [Netmaker](https://github.com/gravitl/netmaker) - Platform that automates WireGuard networks from homelab to enterprise, with a self-hosted server.
- [svenstaro/wiresmith](https://github.com/svenstaro/wiresmith) - Auto-config WireGuard clients into a mesh.
- [Tailscale](https://github.com/tailscale/tailscale) - WireGuard-based mesh VPN with a hosted control plane; the client is open source (BSD-3-Clause).

## Tailscale ecosystem

Add-ons, dashboards and integrations around Tailscale and its open-source control server Headscale.

- [caddy-tailscale](https://github.com/tailscale/caddy-tailscale) - Caddy plugin that integrates Tailscale; experimental.
- [Headplane](https://github.com/tale/headplane) - Feature-complete web UI for Headscale.
- [Headscale UI](https://github.com/gurucomputing/headscale-ui) - Web frontend for the Headscale coordination server.
- [tailscale-mcp](https://github.com/YawLabs/tailscale-mcp) - MCP server for managing a tailnet from AI assistants.
- [TSDProxy](https://github.com/almeidapaulopt/tsdproxy) - Automatic Tailscale reverse proxy for Docker containers, configured with labels.

## Overlay and zero-trust networks beyond WireGuard

Not WireGuard-based, but often compared with it when choosing an overlay network.

- [Nebula](https://github.com/slackhq/nebula) - Scalable overlay networking tool focused on performance, simplicity and security; not WireGuard-based.
- [Pangolin](https://github.com/fosrl/pangolin) - Self-hostable platform for secure, identity-aware access to apps and infrastructure.
- [ZeroTier](https://github.com/zerotier/ZeroTierOne) - Peer-to-peer virtual Ethernet networks with its own protocol; not WireGuard-based.

## Self-hosted servers and web UIs

Run your own WireGuard server and manage peers from a browser.

- [brsyuksel/wghttp](https://github.com/brsyuksel/wghttp/) - Lightweight, zero-log HTTP server for managing WireGuard devices and peers.
- [Defguard](https://github.com/DefGuard/defguard) - Open-core zero-trust access platform on WireGuard, with SSO and 2FA/MFA.
- [Firezone](https://github.com/firezone/firezone) - Self-hostable remote access platform; the project started as a WireGuard-based alternative to OpenVPN Access Server.
- [freifunkMUC/wg-access-server](https://github.com/freifunkMUC/wg-access-server) - An all-in-one WireGuard VPN solution with a Web UI for connecting devices.
- [h44z/wg-portal](https://github.com/h44z/wg-portal) - WireGuard configuration portal with LDAP integration.
- [wg-easy/wg-easy](https://github.com/wg-easy/wg-easy) - Run a WireGuard VPN server with a web-based admin UI.
- [WGDashboard](https://github.com/WGDashboard/WGDashboard) - Dashboard for managing WireGuard, written in Python and Vue.js.
- [WireBuddy](https://github.com/Gill-Bates/wirebuddy) - Self-hosted WireGuard management with DNS filtering, analytics and one-click mobile setup.
- [Wiresteward](https://github.com/utilitywarehouse/wiresteward) - A WireGuard peer manager with OAuth2 authentication.

## Installers and config generators

Scripts and generators that write WireGuard configs, set up servers or give you a terminal UI.

- [amneziawg-installer](https://github.com/bivlked/amneziawg-installer) - One-command installer for an AmneziaWG server on Ubuntu or Debian.
- [AndrianBdn/wg-cmd](https://github.com/AndrianBdn/wg-cmd) - Terminal UI for a simple WireGuard VPN setup, with QR codes and a setup wizard.
- [angristan/WireGuard-install](https://github.com/angristan/wireguard-install) - WireGuard VPN installer for Linux servers.
- [b-m-f/wired](https://github.com/b-m-f/wired) - WireGuard network configuration generator with support for multiple topologies, written in Rust.
- [dsnet](https://github.com/naggie/dsnet/) - Manages a centralised WireGuard VPN with key generation and address allocation.
- [easy-wg-quick](https://github.com/burghardt/easy-wg-quick) - Creates Wireguard configuration for hub and peers with ease.
- [Nyr/wireguard-install](https://github.com/Nyr/wireguard-install) - WireGuard road warrior installer for Ubuntu, Debian, CentOS and Fedora.
- [PiVPN](https://github.com/pivpn/pivpn) - VPN installer scripts designed for Raspberry Pi.
- [psyhomb/wireguard-tools](https://github.com/psyhomb/wireguard-tools) - WireGuard helper scripts.
- [Simple-WG-Config-Generator](https://github.com/ygguser/Simple-WG-Config-Generator) - Web-based generator of WireGuard configuration files.
- [vortix](https://github.com/Harry-kp/vortix) - Terminal UI for WireGuard and OpenVPN with multi-tunnel control, telemetry and leak guard.
- [WireGuard-Manager](https://github.com/complexorganizations/wireguard-manager) - Installer and manager for a self-hosted WireGuard VPN.

## Tools and libraries

Userspace proxies, control libraries, port forwarders and other building blocks.

- [bitwister/twine](https://github.com/bitwister/twine) - Label-based route and port forwarding for Docker containers through a WireGuard container.
- [coder/wush](https://github.com/coder/wush) - Transfers files between computers over WireGuard.
- [nr-wg-mtu-finder](https://github.com/nitred/nr-wg-mtu-finder) - Finds optimal MTU values for a WireGuard server and peer to maximize transfer speed.
- [onetun](https://github.com/aramperes/onetun) - User-space WireGuard port forwarder: reach ports on peers without installing WireGuard locally.
- [sandialabs/wiretap](https://github.com/sandialabs/wiretap) - Transparent, VPN-like proxy server that tunnels traffic via WireGuard and needs no special privileges.
- [tun2socks](https://github.com/xjasonlyu/tun2socks) - Forwards traffic from a TUN device to a proxy, built on the gVisor TCP/IP stack.
- [wireguard-tools](https://github.com/WireGuard/wireguard-tools) - Official command-line tools wg and wg-quick (GitHub mirror).
- [wireproxy](https://github.com/octeep/wireproxy) - A userspace WireGuard client that connects to a WireGuard peer, and exposes a SOCKS5 proxy.

## Desktop clients

Graphical clients and tray apps.

- [TunnlTo/desktop-app](https://github.com/TunnlTo/desktop-app) - Lightweight WireGuard client for Windows built for split tunneling.
- [wg-fleet](https://github.com/OTFRenji/wg-fleet) - Windows app that manages WireGuard peers across several VPS servers over SSH.
- [WireGuardStatusbar](https://github.com/aequitas/macos-menubar-wireguard) - Menu bar icon for WireGuard and wg-quick on macOS.
- [WireGUI](https://github.com/henri26mobu/wiregui) - Graphical interface for WireGuard on Linux and macOS.

## Deployment

Docker images, Ansible roles, Terraform and one-click setups.

- [Algo VPN](https://github.com/trailofbits/algo) - Ansible scripts from Trail of Bits that set up a personal WireGuard and IPsec VPN in the cloud.
- [ansible-role-wireguard](https://github.com/githubixx/ansible-role-wireguard) - Ansible role that installs WireGuard on Debian, Ubuntu, Fedora, CentOS and other Linux distributions.
- [auto-vpn](https://github.com/g1ibby/auto-vpn) - Deploys on-demand, temporary WireGuard servers on VPS providers such as Vultr or Linode, with automated cleanup.
- [linuxserver/docker-wireguard](https://github.com/linuxserver/docker-wireguard) - WireGuard container image from LinuxServer.io.
- [masipcat/wireguard-go-docker](https://github.com/masipcat/wireguard-go-docker) - WireGuard Docker image.
- [WireHole](https://github.com/IAmStoxe/wirehole) - WireGuard, Pi-hole and Unbound in one Docker-compose project for a personal VPN with ad blocking.

## Implementations

The protocol outside the Linux kernel: userspace, other operating systems and embedded devices.

- [amneziawg-go](https://github.com/amnezia-vpn/amneziawg-go) - Go implementation of AmneziaWG, a WireGuard variant with traffic obfuscation.
- [boringtun](https://github.com/cloudflare/boringtun) - Userspace WireGuard implementation in Rust by Cloudflare.
- [NetBSD wg(4)](https://man.netbsd.org/wg.4) - Implementation by Ryota Ozaki, written in C.
- [OpenBSD wg(4)](https://undeadly.org/cgi?action=article;sid=20200622052207) - Implementation by Matt Dunwoodie, written in C.
- [smartalock/wireguard-lwip](https://github.com/smartalock/wireguard-lwip) - A C implementation of the WireGuard protocol intended to be used with the lwIP IP stack.
- [wireguard-go](https://github.com/WireGuard/wireguard-go) - Official userspace Go implementation (GitHub mirror of git.zx2c4.com/wireguard-go).

## Services built on WireGuard

Commercial and free services that use WireGuard.

- [Mullvad](https://github.com/mullvad/mullvadvpn-app) - Open-source VPN client for desktop and mobile; WireGuard is a supported protocol.
- [Warp](https://blog.cloudflare.com/1111-warp-better-vpn/) - Cloudflare announces WARP, a WireGuard-based consumer VPN.
- [wgcf](https://github.com/ViRb3/wgcf) - Cross-platform, unofficial CLI for Cloudflare Warp.

## Guides and articles

Articles and tutorials that explain how WireGuard and Tailscale work in practice.

- [Decoding WireGuard with Wireshark](https://blog.salrashid.dev/articles/2022/wireguard_wireshark/) - A simple guide on how to inspect WireGuard packets in Wireshark.
- [Getting Started with WireGuard](https://miguelmota.com/blog/getting-started-with-wireguard/) - Introductory walkthrough for setting up WireGuard.
- [How Tailscale works](https://tailscale.com/blog/how-tailscale-works) - Tailscale engineers explain NAT traversal, DERP relays and key distribution.
- [How to access a peer's local network](https://iliasa.eu/wireguard-how-to-access-a-peers-local-network/) - Reach a peer's local network without configuring split tunneling.
- [How to easily configure WireGuard](https://www.stavros.io/posts/how-to-configure-wireguard/) - Tutorial on configuring WireGuard peers and interfaces.
- [IPv6 WireGuard Peering at Fly.io](https://fly.io/blog/ipv6-wireguard-peering/) - How Fly.io uses WireGuard for IPv6 peering.
- [Our User-Mode WireGuard Year](https://fly.io/blog/our-user-mode-wireguard-year/) - Fly.io engineers look back on a year of running user-mode WireGuard.
- [Routing Docker Host And Container Traffic Through WireGuard](https://www.linuxserver.io/blog/routing-docker-host-and-container-traffic-through-wireguard) - Route Docker host and container traffic through a WireGuard tunnel.
- [Routing Specific Docker Containers Through WireGuard VPN with systemd-networkd](https://www.eisfunke.com/article/docker-wireguard-systemd.html) - Route specific Docker containers through a WireGuard VPN using systemd-networkd.
- [SSH and User-mode IP WireGuard](https://fly.io/blog/ssh-and-user-mode-ip-wireguard/) - How Fly.io built SSH access on top of user-mode WireGuard.
- [Tailscale vs WireGuard](https://www.alekseialeinikov.com/en/blog/topics/security/tailscale-vs-wireguard) - When plain WireGuard is enough, what Tailscale adds on top, and what to run at home or at work.
- [Tailscale's human-scale networks are still controlled by Google and Microsoft](https://iliana.fyi/blog/tailscale-auth-and-threat-modeling/) - Threat-modeling Tailscale's authentication and its dependence on identity providers.
- [Tunnel WireGuard via WebSockets](https://kirill888.github.io/notes/wireguard-via-websocket/) - Setting up WireGuard to work in restricted networks that block UDP traffic.
- [What They Don’t Tell You About Setting Up A WireGuard VPN](https://dev.to/tangramvision/what-they-don-t-tell-you-about-setting-up-a-wireguard-vpn-1h2g) - Practical lessons from setting up a WireGuard VPN.
- [WireGuard Endpoint Discovery and NAT Traversal using DNS-SD](https://www.jordanwhited.com/posts/wireguard-endpoint-discovery-nat-traversal/) - Endpoint discovery and NAT traversal for WireGuard peers using DNS-SD.
- [WireGuard Gotchas with Multiple Tunnels](https://casavant.org/2020/10/10/wireguard-fwmark.html) - Pitfalls when running several WireGuard tunnels where one carries the default route.
- [WireGuard in NetworkManager](https://blogs.gnome.org/thaller/2019/03/15/wireguard-in-networkmanager/) - Linux NetworkManager has WireGuard support.
- [WireGuard VPN Road Warrior Setup](https://emanuelduss.ch/2018/09/29/wireguard-vpn-road-warrior-setup/) - Road warrior setup with split tunnelling.
- [WireGuard with VRFs](https://margau.net/posts/2024-01-12-wireguard-vrf/) - Using WireGuard together with Linux VRF routing isolation.

## Talks and videos

- [How To Build Your Own Wireguard VPN Server in The Cloud](https://www.youtube.com/watch?v=7yC-gJtl9mQ) - Tutorial from Lawrence Systems on building a WireGuard server in the cloud.
- [WireGuard: Next Generation Abuse-Resistant Kernel Network Tunnel](https://www.youtube.com/watch?v=eYztYCbV_8U) - Talk by WireGuard author Jason Donenfeld on what WireGuard does and how it works.

## Communities

- [#wireguard on Libera](https://web.libera.chat/#wireguard) - IRC channel on Libera Chat.
- [/r/WireGuard](https://www.reddit.com/r/WireGuard/) - Reddit community for WireGuard.

## Inactive projects

No commits for more than 18 months. They may still work well; check before you depend on them.

- [Autowire](https://github.com/elghazal-a/autowire) - Automatically configures WireGuard interfaces in distributed systems, with Consul as backend. Last commit 2022-02.
- [ciniml/WireGuard-ESP32-Arduino](https://github.com/ciniml/WireGuard-ESP32-Arduino) - WireGuard implementation for ESP32 Arduino in C. Last commit 2024-04.
- [Cloudblock](https://github.com/chadgeary/cloudblock) - Terraform and Ansible deployment of WireGuard, Pi-hole and DNS over HTTPS, in a cloud provider or locally. Last commit 2024-07.
- [docker-wireguard-socks-proxy](https://github.com/kizzx2/docker-wireguard-socks-proxy) - Expose a WireGuard tunnel as a SOCKS5 proxy. Last commit 2019-10.
- [guard](https://github.com/stellarproject/guard) - A gRPC server for managing wireguard tunnels. Last commit 2021-05.
- [HarvsG/WireGuardMeshes](https://github.com/HarvsG/WireGuardMeshes) - Compare WireGuard mesh tools. Last commit 2024-12.
- [LNVPN](https://github.com/LightRider5/lnvpn) - WireGuard VPN provider with Lightning-only, pay-as-you-go payments. Last commit 2025-03.
- [MindFlavor/prometheus_wireguard_exporter](https://github.com/MindFlavor/prometheus_wireguard_exporter) - A Prometheus exporter for WireGuard, very light on your server resources. Last commit 2023-10.
- [MozWire](https://github.com/NilsIrl/MozWire) - Unofficial configuration manager for Mozilla VPN on Linux, macOS and other systems. Last commit 2025-01.
- [muiquq/wgcfghelp](https://github.com/muqiuq/wgcfghelp) - Single-binary CLI for roadwarrior peer management, config, QR code and MikroTik command generation. Last commit 2024-09.
- [network-manager-wireguard](https://github.com/max-moser/network-manager-wireguard) - Network-Manager VPN Plugin for WireGuard. Last commit 2023-06.
- [seashell/drago](https://github.com/seashell/drago) - Self-hosted configuration manager for secure network overlays across heterogeneous nodes, with a web UI. Last commit 2023-10.
- [Subspace](https://github.com/subspacecommunity/subspace) - A simple WireGuard VPN server GUI. Last commit 2024-06.
- [vx3r/wg-gen-web](https://github.com/vx3r/wg-gen-web) - Simple Web based configuration generator for WireGuard. Last commit 2024-05.
- [wesher](https://github.com/costela/wesher) - Creates and manages an encrypted WireGuard mesh across a group of nodes. Last commit 2025-02.
- [wg-make](https://github.com/tevino/wg-make) - Generates configurations for WireGuard peers from a single configuration file. Last commit 2020-06.
- [wg-meshconf](https://github.com/k4yt3x/wg-meshconf) - WireGuard full mesh configuration generator. Last commit 2024-05.
- [wgctl](https://github.com/apognu/wgctl) - Utility to configure and manage your WireGuard tunnels. Last commit 2023-03.
- [wgctrl](https://github.com/WireGuard/wgctrl-go) - Go package for controlling WireGuard interfaces on multiple platforms. Last commit 2024-12.
- [wgsd](https://github.com/jwhited/wgsd) - CoreDNS plugin that serves WireGuard peer information via DNS-SD (RFC 6763). Last commit 2023-12.
- [wireguard-manager-and-api](https://github.com/Mawthuq-Software/wireguard-manager-and-api) - A tool for rotating the keys on peers to increase their privacy by removing their IP address from memory. Last commit 2022-06.
- [wireguard-ui](https://github.com/ngoduykhanh/wireguard-ui) - Web UI for managing WireGuard server configuration and clients. Last commit 2024-08.

## FAQ

### Tailscale and WireGuard: what is the difference

Tailscale uses WireGuard for the encrypted tunnels and adds key distribution, NAT traversal, relays, identity and access rules on top. Plain WireGuard gives you the tunnel and leaves the rest to you. The guides section explains how Tailscale works under the hood.

### Self-hosting Tailscale with Headscale

The Tailscale client is open source, but its coordination server is a hosted service. Headscale is an independent, open-source implementation of that control server that works with Tailscale clients.

### Easiest way to run your own WireGuard server

For one server, an installer script or a web UI such as wg-easy is enough. Once you need many sites or devices with access rules, look at the mesh tools above.

### Do you need a web UI

No. WireGuard works from the command line with `wg-quick`. A web UI helps when several people add and remove peers or when you want QR codes for phones.

### How to add your project

Open a pull request or an issue; the rules are short and are in the contributing guide.

## Contributing

Contributions are welcome. Read the [contribution guidelines](CONTRIBUTING.md) first. This list continues [cedrickchee/awesome-wireguard](https://github.com/cedrickchee/awesome-wireguard), which is no longer maintained, under the same MIT license.
