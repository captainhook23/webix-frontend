import { JetView } from 'webix-jet';

export default class TopView extends JetView{
    config() {
        // Toolbar mit Menu-Icon und Sprachauswahl
        const toolbar = {
            view: "toolbar",
            css: "webix_dark",
            padding: { left: 10, right: 10 },
            elements: [
                {
                    view: "icon",
                    icon: "wxi-menu",
                    click: () => {
                        const sidebar = this.$$("sidebar");
                        sidebar.isCollapsed() ? sidebar.expand() : sidebar.collapse();
                    },
                },
                { view: "label", label: "My Application", align: "center" },
                {
                    cols: [
                        {
                            view: "icon",
                            icon: "wxi-globe",
                            tooltip: "Change Language",
                        },
                        {
                            view: "richselect",
                            localId: "languageSelector",
                            css: "language-selector",
                            width: 100,
                            options: [
                                { id: "en", value: "English" },
                                { id: "de", value: "Deutsch" },
                                { id: "it", value: "Italiano" },
                                { id: "fr", value: "Français" },
                            ],
                            value: "en", // Standard-Sprache
                            on: {
                                onChange: (lang) => {
                                    this.changeLanguage(lang);
                                },
                            },
                        },
                    ],
                },
            ],
        };

        // Sidebar als Menü
        const sidebar = {
            view: "sidebar",
            id: "sidebar",
            localId: "sidebar",
            width: 200,
            data: [
                { id: "dashboard", icon: "wxi-columns", value: "Dashboard" },
                { id: "settings", icon: "wxi-pencil", value: "Settings" },
                { id: "help", icon: "wxi-question", value: "Help" },
            ],
            on: {
                onAfterSelect: (id) => {
                    this.show(`./${id}`);
                },
            },
        };

        // Hauptlayout mit Toolbar und Sidebar
        return {
            rows: [
                toolbar,
                {
                    cols: [
                        sidebar,
                        { $subview: true }, // Unteransichten werden hier geladen
                    ],
                },
            ],
        };
    }

    init() {
        this.$$("sidebar").select("dashboard"); // Standard-Auswahl
    }

    /**
     * Ändert die Sprache und aktualisiert die Benutzeroberfläche.
     * @param {string} lang - Sprachcode (z. B. "en", "de", "it", "fr").
     */
    changeLanguage(lang) {
        webix.message(`Language switched to ${lang}`);
        // Hier kannst du die Logik zur Sprachumschaltung einfügen,
        // z. B. Übersetzungsdateien laden oder die Webix-I18n-Konfiguration aktualisieren.
        this.app.getService("locale").setLang(lang);
    }
}

