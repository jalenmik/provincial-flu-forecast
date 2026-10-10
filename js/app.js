import { h, render } from "preact";
import { useState, useEffect, useRef } from "preact/hooks";

import { Header, Footer, Transparency} from "./components.js";
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

                h("div", { class: "data-source-banner" },
                    h("p", { class: "data-source-note" }, 
                        `Admissions are a strong indicator of flu activity.
                        For each admission, there are typically many more cases,
                        and even more infectious people in the given population.
                        An increase in admissions generally indicates an increase
                        in overall flu activity.`
                    ),
                    h("p", { class: "data-source-note" }, 
                        h("strong", null, "Note: "), 
                        `Data points may be corrected upward after initial reporting.`
                    ),
                    h("p", { class: "data-source-text" },
                        h("strong", null, "Data Source: "),
                        h("a", {
                            href: currentPlot.sourceUrl,
                            target: "_blank",
                            rel: "noopener noreferrer",
                            class: "data-source-link"
                        }, currentPlot.sourceText)
                    )
                )
            )
        ),

        h(Footer)
    );
}

render(h(App), document.getElementById("app"));