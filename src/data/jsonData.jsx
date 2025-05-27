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
    },
    {
      id: "image",
      name: "Image Dashboard",
      widgets: [
        {
          id: "image-vulnerabilities",
          name: "Image Vulnerabilities",
          type: "bar-chart",
          data: {
            total: 342,
            critical: 12,
            high: 89,
            medium: 156,
            low: 85
          }
        },
        {
          id: "container-images",
          name: "Container Images",
          type: "donut-chart",
          data: {
            total: 28,
            items: [
              { label: "Scanned", value: 22, color: "#32CD32" },
              { label: "Not Scanned", value: 6, color: "#FF4500" }
            ]
          }
        }
      ]
    },
    {
      id: "ticket",
      name: "Ticket Dashboard",
      widgets: [
        {
          id: "ticket-status",
          name: "Ticket Status Overview",
          type: "donut-chart",
          data: {
            total: 156,
            items: [
              { label: "Open", value: 45, color: "#FF4500" },
              { label: "In Progress", value: 38, color: "#FFA500" },
              { label: "Resolved", value: 62, color: "#32CD32" },
              { label: "Closed", value: 11, color: "#C0C0C0" }
            ]
          }
        },
        {
          id: "priority-tickets",
          name: "Priority Tickets",
          type: "bar-chart",
          data: {
            high: 23,
            medium: 67,
            low: 66
          }
        }
      ]
    }
  ],
  availableWidgets: [
    // CSPM widgets
    { id: "cloud-accounts", name: "Cloud Accounts", categoryId: "cspm" },
    { id: "cloud-risk", name: "Cloud Account Risk Assessment", categoryId: "cspm" },
    
    // CWPP widgets
    { id: "namespace-alerts", name: "Top 5 Namespace Specific Alerts", categoryId: "cwpp" },
    { id: "workload-alerts", name: "Workload Alerts", categoryId: "cwpp" },
    
    // Registry widgets
    { id: "image-risk", name: "Image Risk Assessment", categoryId: "registry" },
    { id: "image-security", name: "Image Security Issues", categoryId: "registry" },
    
    // Image widgets
    { id: "image-vulnerabilities", name: "Image Vulnerabilities", categoryId: "image" },
    { id: "container-images", name: "Container Images", categoryId: "image" },
    { id: "image-compliance", name: "Image Compliance Score", categoryId: "image" },
    { id: "base-images", name: "Base Images Analysis", categoryId: "image" },
    
    // Ticket widgets
    { id: "ticket-status", name: "Ticket Status Overview", categoryId: "ticket" },
    { id: "priority-tickets", name: "Priority Tickets", categoryId: "ticket" },
    { id: "ticket-trends", name: "Ticket Trends", categoryId: "ticket" },
    { id: "sla-performance", name: "SLA Performance", categoryId: "ticket" }
  ]
};