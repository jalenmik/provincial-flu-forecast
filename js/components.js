import { h } from "preact";

export function Header() {
    return h("header", null,
        h("h1", null, "Provincial Influenza Forecasts"),
        h("h3", null, "Produced by JBM Advanced Analytics Consulting"),
        h("p", null, "Updated: 2026-09-27")
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
        h("p", null, "Email jalen@jbmanalytics.ca for inquiries.")
    );
}

export function Transparency() {
    return h("header", null,
        h("h3", null, "Intended Use"),
        h("p", null, `These forecasts are for informational, educational, and
            research purposes only and do not constitute medical, epidemiological,
            or public health advice. All results presented are probabilistic in
            nature; they are a product of computer simulation and machine learning
            methods, they are not infallible predictions of the future.`)
    );
}

export function Liability() {
    return h("footer", null,
        h("h3", null, "Liability"),
        h("p", null, `The data and forecasts are provied "as is" and "as available"
            without warranties of any kind, either express or implied. The accuracy,
            completeness, and timeliness of the forecasts cannot be guaranteed. Any
            liability for any direct, indirect, or consequential damages arising out
            of the use of - or reliance on - the forecasts presented herein are
            disclaimed.`)
    );
}
