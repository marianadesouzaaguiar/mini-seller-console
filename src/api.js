import leadsData from "./leads.json"; 

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchLeads = async () => {
  await delay(500);
  return [...leadsData];
};

export const saveLeadPatch = async (leadId, patch) => {
  await delay(300);
  const index = leadsData.findIndex((l) => l.id === leadId);
  if (index === -1) throw new Error("Lead not found.");
  leadsData[index] = { ...leadsData[index], ...patch };
  return leadsData[index];
};
