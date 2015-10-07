<!---
/*
 *
 * Copyright (c) 2015 Fraunhofer FOKUS, All rights reserved.
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 3.0 of the License, or (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with this library. If not, see <http://www.gnu.org/licenses/>.
 *
 * AUTHORS: Louay Bassbouss (louay.bassbouss@fokus.fraunhofer.de)
 *
 */
-->

# HelloApp - Sample App using the [Cordova HbbTV Plugin](https://github.com/fraunhoferfokus/cordova-plugin-hbbtv)

This sample app bases on the standard Cordova sample app and extends it by
HbbTV 2.0 CS features using the [Cordova HbbTV Plugin](https://github.com/fraunhoferfokus/cordova-plugin-hbbtv).
Please refer to the [HbbTV 2.0 Spec document -> section 14 about Companion Screen][hbbtv20spec] for more details.

[Comments](https://github.com/fraunhoferfokus/cordova-plugin-hbbtv-helloapp/issues) and [contribution](https://github.com/fraunhoferfokus/cordova-plugin-hbbtv-helloapp/pulls) anytime welcome.

# Build and run instructions

Currently the [Cordova HbbTV Plugin](https://github.com/fraunhoferfokus/cordova-plugin-hbbtv) supports Android. iOS is work in progress and will be available soon.

## Android instructions

It is assumed that you have Android SDK installed, path to SDK binaries set
and have Cordova set up properly.

```
$ git clone https://github.com/fraunhoferfokus/cordova-plugin-hbbtv-helloapp
$ cd cordova-plugin-hbbtv-helloapp
$ cordova platform add android
$ cordova plugin add cordova-plugin-hbbtv
$ cordova build android
$ cordova run android
```

NOTE: the command `cordova plugin add cordova-plugin-hbbtv` may not be needed since Cordova installs required plugins listed in `config.xml`
(e.g. `<plugin name="cordova-plugin-hbbtv" version="0.0.2"/>` for the HbbTV plugin) automatically after adding a platform using `cordova platform add android`.
Alternatively to installing the Cordova plugin from the registry, the plugin can be installed by pointing to its repository on GitHub:

```$ cordova plugin add https://github.com/fraunhoferfokus/cordova-plugin-hbbtv.git```

## iOS instructions

coming soon ...

# Usage of the [Cordova HbbTV Plugin](https://github.com/fraunhoferfokus/cordova-plugin-hbbtv)

The App files are available in the [www](www) folder. [cs-app.html](www/cs-app.html) is the main HTML file loaded when the
App is started. [js/cs-app.js](www/js/cs-app.js) is the main JavaScript file of this App. Please refer to it for more details
about the usage of the [Cordova HbbTV Plugin](https://github.com/fraunhoferfokus/cordova-plugin-hbbtv) in this App. Please also
refer to the [Cordova HbbTV Plugin Documentation](https://github.com/fraunhoferfokus/cordova-plugin-hbbtv/blob/master/doc/index.md)
to get more details about the Plugin APIs.

# License

Free for non commercial use released under the GNU Lesser General Public License v3.0, See [LICENSE file](LICENSE).

Contact us for commercial use <famecontact@fokus.fraunhofer.de>

Copyright (c) 2015 [Fraunhofer FOKUS](https://www.fokus.fraunhofer.de/)

### Contact

[Fraunhofer FOKUS - Competence Center FAME // Future Applications and Media](http://www.fokus.fraunhofer.de/fame)

![Fraunhofer FOKUS](https://famalytics.fokus.fraunhofer.de/piwik.php?idsite=19&rec=1&action_name=cordova-plugin-hbbtv-readme)

[hbbtv20spec]: https://www.hbbtv.org/pages/about_hbbtv/HbbTV_specification_2_0.pdf