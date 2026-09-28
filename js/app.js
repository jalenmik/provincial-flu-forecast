import { h, render } from "preact";
import { useState, useEffect, useRef } from "preact/hooks";

import { Header, Footer, Transparency, Liability } from "./components.js";
import { loadDataset } from "./data.js";
import { projplt } from "./plots.js";

const PLOTS = [
    {
        id: "AB",
        label: "Alberta",
        dataset: "AB_fcast",
        sourceText: "https://www.alberta.ca/stats/dashboard/respiratory-virus-dashboard.htm",
        sourceUrl: "https://www.alberta.ca/stats/dashboard/respiratory-virus-dashboard.htm"
    },
    {
        id: "MB",
        label: "Manitoba",
        dataset: "MB_fcast",
        sourceText: "https://www.gov.mb.ca/health/publichealth/surveillance/influenza/index.html",
        sourceUrl: "https://www.gov.mb.ca/health/publichealth/surveillance/influenza/index.html"
    },
    {
        id: "ON",
        label: "Ontario",
        dataset: "ON_fcast",
        sourceText: "https://www.publichealthontario.ca/en/Data-and-Analysis/Infectious-Disease/Respiratory-Virus-Tool",
        sourceUrl: "https://www.publichealthontario.ca/en/Data-and-Analysis/Infectious-Disease/Respiratory-Virus-Tool"
    }
];

function Chart({ dataset }) {
    const containerRef = useRef(null);

    useEffect(() => {
        let isSubscribed = true;

        loadDataset(dataset).then((data) => {
            if (isSubscribed && containerRef.current) {
                containerRef.current.innerHTML = "";
                projplt(containerRef.current, data);
            }
        });

        return () => {
            isSubscribed = false;
        };
    }, [dataset]);

    return h("div", { ref: containerRef, class: "chart" });
}

function App() {
    const [activeTabId, setActiveTabId] = useState(PLOTS[0].id);

    const currentPlot = PLOTS.find((plot) => plot.id === activeTabId) || PLOTS[0];

    return h("div", null,
        h(Header),

        h(Transparency),

        h("main", null,
            h("nav", { class: "tab-navigation" },
                PLOTS.map((plot) =>
                    h("button", {
                        key: plot.id,
                        onClick: () => setActiveTabId(plot.id),
                        class: `tab-button ${activeTabId === plot.id ? "active" : ""}`
                    }, plot.label)
                )
            ),

            h("div", { class: "plot-card" },
                h("h2", { class: "plot-title" }, currentPlot.label),

                h(Chart, {
                    key: currentPlot.id,
                    dataset: currentPlot.dataset
                }),

                // Data Source with Hyperlink
                h("p", { class: "data-source" },
                    "Data Source: ",
                    h("a", {
                        href: currentPlot.sourceUrl,
                        target: "_blank",
                        rel: "noopener noreferrer",
                        class: "data-source-link"
                    }, currentPlot.sourceText)
                )
            )
        ),

        h(Footer),

        h(Liability)
    );
}

render(h(App), document.getElementById("app"));