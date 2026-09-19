
export function projplt(div, dataset) {
    // 1. Extract and sort x-axis values (dates) and metric arrays
    const sortedData = [...dataset].sort((a, b) => new Date(a.timepoint) - new Date(b.timepoint));

    const dates = sortedData.map(d => d.timepoint);
    const medValues = sortedData.map(d => d.med);
    const pct25Values = sortedData.map(d => d.pct25);
    const pct75Values = sortedData.map(d => d.pct75);
    const admissions = sortedData.map(d => d.hospital_admissions);
    const prevSeason = sortedData.map(d => d.prev_season);

    // 2. Build Ribbon (25th to 75th Percentile)
    // Lower bound trace (invisible base line)
    const lowerBoundTrace = {
        x: dates,
        y: pct25Values,
        type: "scatter",
        mode: "lines",
        line: { color: "transparent" },
        showlegend: false,
        hoverinfo: "skip"
    };

    // Upper bound trace (fills down to lower bound)
    const upperBoundTrace = {
        x: dates,
        y: pct75Values,
        type: "scatter",
        mode: "lines",
        fill: "tonexty",
        fillcolor: "rgba(79, 70, 229, 0.2)", // Subtle indigo shade
        line: { color: "transparent" },
        name: "25th - 75th Percentile",
        hoverinfo: "skip"
    };

    // 3. Previous Season Line (Faint line)
    const prevSeasonTrace = {
        x: dates,
        y: prevSeason,
        type: "scatter",
        mode: "lines",
        name: "Previous Season",
        line: {
            color: "rgba(148, 163, 184, 0.5)", // Faint slate line
            width: 1.5,
            dash: "dot"
        }
    };

    // 4. Median Trace (Solid Line)
    const medianTrace = {
        x: dates,
        y: medValues,
        type: "scatter",
        mode: "lines",
        name: "Median Forecast",
        line: {
            color: "#4f46e5", // Accent indigo color
            width: 2.5
        }
    };

    // 5. Hospital Admissions (Points)
    const admissionsTrace = {
        x: dates,
        y: admissions,
        type: "scatter",
        mode: "markers",
        name: "Hospital Admissions",
        marker: {
            color: "#0f172a", // Dark slate dots
            size: 7
        }
    };

    // 6. Layout Configuration
    const layout = {
        xaxis: {
            title: { text: "Date" },
            type: "date"
        },
        yaxis: {
            title: { text: "Admissions" },
            zeroline: false
        },
        hovermode: "x unified",
        margin: { l: 60, r: 20, t: 30, b: 50 },
        legend: {
            orientation: "h",
            y: 1.15,
            x: 0
        }
    };

    // 7. Render Plot
    const traces = [lowerBoundTrace, upperBoundTrace, prevSeasonTrace, medianTrace, admissionsTrace];
    Plotly.newPlot(div, traces, layout, { responsive: true });
}
