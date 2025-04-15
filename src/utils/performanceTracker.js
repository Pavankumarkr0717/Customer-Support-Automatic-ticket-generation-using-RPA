// Performance tracking utility functions

// Calculate new skill points based on performance metrics
export const calculateNewSkillPoints = (currentPoints, performanceMetrics) => {
  let newPoints = currentPoints;
  
  // Points for ticket resolution
  newPoints += performanceMetrics.ticketsResolved * 2;
  
  // Points for meeting deadlines
  newPoints += performanceMetrics.deadlinesMet * 3;
  
  // Points for customer satisfaction
  newPoints += performanceMetrics.customerSatisfaction * 5;
  
  // Deduct points for escalations
  newPoints -= performanceMetrics.escalations * 5;
  
  // Ensure points stay within bounds (0-100)
  return Math.max(0, Math.min(100, newPoints));
};

// Determine new SLA level based on skill points
export const calculateNewSlaLevel = (currentPoints) => {
  if (currentPoints >= 90) return "Platinum";
  if (currentPoints >= 75) return "Gold";
  if (currentPoints >= 50) return "Silver";
  return "Bronze";
};

// Calculate performance metrics for a given period
export const calculatePerformanceMetrics = (tickets, employeeName, periodStart, periodEnd) => {
  const employeeTickets = tickets.filter(
    (ticket) => 
      ticket.assignedTo === employeeName && 
      new Date(ticket.createdAt) >= periodStart && 
      new Date(ticket.createdAt) <= periodEnd
  );

  return {
    ticketsResolved: employeeTickets.filter(t => t.status === "Resolved").length,
    deadlinesMet: employeeTickets.filter(t => 
      t.status === "Resolved" && new Date(t.resolvedAt) <= new Date(t.deadline)
    ).length,
    customerSatisfaction: calculateAverageSatisfaction(employeeTickets),
    escalations: employeeTickets.filter(t => t.status === "Escalated").length,
  };
};

// Calculate average customer satisfaction from resolved tickets
const calculateAverageSatisfaction = (tickets) => {
  const resolvedTickets = tickets.filter(t => t.status === "Resolved");
  if (resolvedTickets.length === 0) return 0;
  
  const totalSatisfaction = resolvedTickets.reduce((sum, ticket) => 
    sum + (ticket.customerSatisfaction || 0), 0);
  
  return Math.round(totalSatisfaction / resolvedTickets.length);
};

// Update employee performance metrics
export const updateEmployeePerformance = (employee, tickets, periodStart, periodEnd) => {
  const performanceMetrics = calculatePerformanceMetrics(tickets, employee.name, periodStart, periodEnd);
  const newSkillPoints = calculateNewSkillPoints(employee.skillPoints, performanceMetrics);
  const newSlaLevel = calculateNewSlaLevel(newSkillPoints);

  return {
    ...employee,
    skillPoints: newSkillPoints,
    slaLevel: newSlaLevel,
    performanceMetrics: {
      ...performanceMetrics,
      lastUpdated: new Date().toISOString(),
    },
  };
}; 