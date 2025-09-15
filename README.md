# Netplan editor tool for Ubuntu server

This repository provides an editor tool on netplan yaml which used in Ubuntu server series.

## How to install it

Get [GitHub url](https://github.com/minosys-jp/NetPlan-Manage.git),
and type as follows:

```
cd NetPlan-Manage
npm install
npm run build
bash packet.sh
```

then

```
cd packet
bash start.sh
```

You must be sudoers, and require your own password to start up.
