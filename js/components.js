import { h } from "preact";

export function Header() {
    return h("header", null,
        h("h1", null, "Provincial Influenza Forecasts"),
        h("h3", null, "Produced by JBM Advanced Analytics Consulting"),
        h("p", null, "Updated: 2026-09-20")
    );
}

export function Footer() {
    return h("footer", null,
        h("h3", null, "Methodology"),
        h("p", null, `The mode used to produce the forecasts is a particle-filtered
            infectious disease compartmental model. The stocks follow the canonical
            SEIR form. The particle filtering algorithm recursively updates based
            on incoming data points, grounding the model states in the latest
            evidence before forecasting forward.`),
        h("h3", null, "Limitations / Opportunities"),
        h("p", null, `The results shown here represent a minimum viable product.
            Additional details and data sources could be incorporated to provide
            more valuable insights, such as:`),
        h("p", null, "\u2022 Forecasted hospital census"),
        h("p", null, "\u2022 Breakdown by age group"),
        h("p", null, "\u2022 Breakdown by areas within a province"),
        h("p", null, "Email jalen@jbmanalytics.ca for any inquiries.")
    );
}
