import { h } from "preact";

export function Header() {
    return h("header", { class: "dashboard-header" },
        h("div", { class: "header-main" },
            h("h1", { class: "header-title" }, "Provincial Influenza Forecasts"),
            h("p", { class: "header-subtitle" }, "Produced by JBM Advanced Analytics Consulting Inc.")
        ),
        h("div", { class: "header-meta" },
            h("span", { class: "meta-badge" }, "Updated: 2026-10-10")
        )
    );
}

export function Transparency() {
    return h("section", { class: "transparency-banner" },
        h("h3", null, "Intended Use"),
        h("p", null, 
            `These forecasts are for informational, educational, and research purposes only ` +
            `and do not constitute medical, epidemiological, or public health advice. All results ` +
            `presented are probabilistic in nature; they are a product of computer simulation ` +
            `and machine learning methods, they are not infallible predictions of the future.`
        )
    );
}

export function Footer() {
    return h("footer", { class: "dashboard-footer" },
        h("details", { class: "footer-accordion" },
            h("summary", null, "Methodology, Opportunities & Liability"),
            h("div", { class: "footer-content" },
                h("div", { class: "footer-section" },
                    h("h4", null, "Methodology"),
                    h("p", null, 
                        `The model used to produce the above forecasts is a particle-filtered ` +
                        `infectious disease compartmental model. The stocks follow the canonical ` +
                        `SEIR form. The particle filtering algorithm recursively updates based ` +
                        `on incoming data points, grounding the model states in the latest ` +
                        `evidence before forecasting forward.`
                    )
                ),
                h("div", { class: "footer-section" },
                    h("h4", null, "Opportunities"),
                    h("p", null, 
                        `Additional model development and incorporation of other data sources ` +
                        `could be leveraged to provide other valuable insights, such as:`
                    ),
                    h("ul", { class: "limitations-list" },
                        h("li", null, "Forecasted hospital census"),
                        h("li", null, "Detailed breakdown by age groups"),
                        h("li", null, "Results for specific areas within in a province")
                    ),
                    h("p", { class: "contact-inquiry" }, 
                        "Email ",
                        h("a", { href: "mailto:jalen@jbmanalytics.ca" }, "jalen@jbmanalytics.ca"),
                        " for inquiries."
                    )
                ),
                h("div", { class: "footer-section" },
                    h("h4", null, "Liability"),
                    h("p", null, 
                        `The data and forecasts are provided "as is" and "as available" ` +
                        `without warranties of any kind, either express or implied. The accuracy, ` +
                        `completeness, and timeliness of the forecasts cannot be guaranteed. Any ` +
                        `liability for any direct, indirect, or consequential damages arising out ` +
                        `of the use of—or reliance on—the forecasts presented herein are disclaimed.`
                    )
                )
            )
        )
    );
}