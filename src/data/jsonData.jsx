// src/data/jsonData.js
export const jsonData = {
    categories: [
      {
        id: "cspm",
        name: "CSPM Executive Dashboard",
        widgets: [
          {
            id: "cloud-accounts",
            name: "Cloud Accounts",
            type: "donut-chart",
            data: {
              total: 4,
              items: [
                { label: "Connected", value: 2, color: "#4169E1" },
                { label: "Not Connected", value: 2, color: "#C0C0C0" }
              ]
            }
          },
          {
            id: "cloud-risk",
            name: "Cloud Account Risk Assessment",
            type: "donut-chart",
            data: {
              total: 9659,
              items: [
                { label: "Failed", value: 1689, color: "#FF4500" },
                { label: "Warning", value: 581, color: "#FFA500" },
                { label: "Not available", value: 30, color: "#C0C0C0" },
                { label: "Passed", value: 7359, color: "#32CD32" }
              ]
            }
          }
        ]
      },
      {
        id: "cwpp",
        name: "CWPP Dashboard",
        widgets: [
          {
            id: "namespace-alerts",
            name: "Top 5 Namespace Specific Alerts",
            type: "line-chart",
            data: {
              available: false
            }
          },
          {
            id: "workload-alerts",
            name: "Workload Alerts",
            type: "line-chart",
            data: {
              available: false
            }
          }
        ]
      },
      {
        id: "registry",
        name: "Registry Scan",
        widgets: [
          {
            id: "image-risk",
            name: "Image Risk Assessment",
            type: "risk-meter",
            data: {
              total: 1470,
              critical: 9,
              high: 760
            }
          },
          {
            id: "image-security",
            name: "Image Security Issues",
            type: "risk-meter",
            data: {
              total: 75,
              critical: 8,
              high: 27
            }
          }
        ]
      }
    ],
    availableWidgets: [
      { id: "cloud-accounts", name: "Cloud Accounts", categoryId: "cspm" },
      { id: "cloud-risk", name: "Cloud Account Risk Assessment", categoryId: "cspm" },
      { id: "namespace-alerts", name: "Top 5 Namespace Specific Alerts", categoryId: "cwpp" },
      { id: "workload-alerts", name: "Workload Alerts", categoryId: "cwpp" },
      { id: "image-risk", name: "Image Risk Assessment", categoryId: "registry" },
      { id: "image-security", name: "Image Security Issues", categoryId: "registry" },
      { id: "ticket-overview", name: "Ticket Overview", categoryId: "ticket" }
    ]
  };