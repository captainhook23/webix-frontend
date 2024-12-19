import * as webix from 'webix'
import './styles/app.css'
import { JetApp, EmptyRouter, HashRouter, plugins } from 'webix-jet'

// dynamic import of views
const modules = import.meta.glob('./views/**/*.js')
const views = (name) => modules[`./views/${name}.js`]().then((x) => x.default)
console.log('Hallo')
// locales, optional
const locales = import.meta.glob('./locales/*.js')
const words = (name) => locales[`./locales/${name}.js`]().then((x) => x.default)

export default class MyApp extends JetApp {
    constructor(config) {
        const defaults = {
            id: import.meta.env.VITE_APPNAME,
            name: import.meta.env.VITE_APPNAME,
            email: import.meta.env.VITE_EMAIL,
            teamname: import.meta.env.VITE_TEAMNAME,
            version: import.meta.env.VITE_VERSION,
            router: import.meta.env.VITE_BUILD_AS_MODULE
                ? EmptyRouter
                : HashRouter,
            debug: !import.meta.env.PROD,
            start: '/top/start',
            // set custom view loader, mandatory
            views,
        }

        super({ ...defaults, ...config })

        // locales plugin, optional
        this.use(plugins.Locale, {
            webix: {
                de: 'de-DE',
                en: 'en-US',
                it: 'it-IT',
                fr: 'fr-FR',
            },
            path: words,
            storage: this.webix.storage.session,
        })
    }
}

if (!import.meta.env.VITE_BUILD_AS_MODULE) {
    webix.ready(() => new MyApp().render())
}
