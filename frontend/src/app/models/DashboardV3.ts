export class DashboardV3 {
    Lead_Id?: number;
    TotalLeads?: number;
    Stage_Name?: string;
    Count?: number;
    Pulse_Name?: string;
    Source_Name?: string;
}

export class DashboardV3Metrics {
    totalLeads: number = 0;
    topStages: any[] = [];
    pipelineMetrics: any[] = [];
    pulseMetrics: any[] = [];
    sourceMetrics: any[] = [];
}
