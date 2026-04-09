import React, { useState } from 'react';

export default function OrganigrammeAgents() {
  const [expandedActivities, setExpandedActivities] = useState<Set<string>>(new Set());

  const agentsData = {
    direction: { name: "ATHÉNA", role: "Directrice Générale", color: "#FF6B6B", description: "Direction générale et pilotage stratégique de Blue Planet World" },
    supportTransversal: [
      { name: "DUMBLEDORE", role: "Intelligence d'Affaires", color: "#4ECDC4", description: "Analyse stratégique, insights marché et intelligence compétitive" },
      { name: "HESTIA", role: "Ressources Humaines", color: "#45B7D1", description: "Gestion des talents, développement organisationnel et bien-être" },
      { name: "PICSOU", role: "Comptabilité & Finance", color: "#FFA502", description: "Gestion financière, reporting et conformité comptable" }
    ],
    activites: [
      { id: "conciergerie", name: "CONCIERGERIE", color: "#9B59B6", chef: "MORGANE", agents: ["SCOUT", "DAVID", "ANDREA"] },
      { id: "blueplanet", name: "BLUE PLANET APP", color: "#3498DB", chef: "NOVA", agents: ["ALEXIS", "LÉO", "CLARA", "SAGA"] },
      { id: "blnbeauty", name: "BLN BEAUTY", color: "#E74C3C", chef: "ÉMILIE", agents: ["CALYPSO", "BUFFY", "FALKOR", "ATREYU", "LOUANE"] },
      { id: "pochettes", name: "POCHETTES SURPRISES", color: "#F39C12", chef: "SÉLÉNÉ", agents: ["PIKACHU", "EVOLI", "MEWTO"] },
      { id: "machines", name: "MACHINES À PELUCHES", color: "#16A085", chef: "LUNA", agents: ["DENVER", "CASPER", "WILLY", "ELIOT"] },
      { id: "agents-ia-b2b", name: "AGENTS IA B2B", color: "#8E44AD", chef: "HERMIONE", agents: ["HARRY", "RON"] }
    ]
  };

  const toggleActivity = (activityId: string) => {
    const newExpanded = new Set(expandedActivities);
    if (newExpanded.has(activityId)) {
      newExpanded.delete(activityId);
    } else {
      newExpanded.add(activityId);
    }
    setExpandedActivities(newExpanded);
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '30px' }}>
        <div style={{ backgroundColor: agentsData.direction.color, padding: '20px', borderRadius: '8px', color: 'white', textAlign: 'center', marginBottom: '20px' }}>
          <h2 style={{ margin: '0 0 8px 0' }}>{agentsData.direction.name}</h2>
          <p style={{ margin: '0', fontSize: '14px' }}>{agentsData.direction.role}</p>
        </div>

        <h3 style={{ marginBottom: '15px', color: '#333' }}>🔧 Fonctions Transversales</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px' }}>
          {agentsData.supportTransversal.map((agent, i) => (
            <div key={i} style={{ backgroundColor: agent.color, padding: '15px', borderRadius: '6px', color: 'white' }}>
              <h4 style={{ margin: '0 0 5px 0' }}>{agent.name}</h4>
              <p style={{ margin: '0', fontSize: '12px' }}>{agent.role}</p>
            </div>
          ))}
        </div>
      </div>

      <h3 style={{ marginBottom: '20px', color: '#333' }}>📊 Activités Métier</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {agentsData.activites.map((activity) => (
          <div key={activity.id} style={{ border: `2px solid ${activity.color}`, borderRadius: '8px', overflow: 'hidden' }}>
            <button onClick={() => toggleActivity(activity.id)} style={{ backgroundColor: activity.color, color: 'white', padding: '15px', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>{activity.name}</span>
              <span>{expandedActivities.has(activity.id) ? '▼' : '▶'}</span>
            </button>
            {expandedActivities.has(activity.id) && (
              <div style={{ padding: '15px', backgroundColor: '#f9f9f9' }}>
                <p style={{ margin: '0 0 10px 0', fontWeight: 'bold', color: '#333' }}>👔 Chef: {activity.chef}</p>
                <p style={{ margin: '0', fontSize: '12px', color: '#666' }}>Agents: {activity.agents.join(', ')}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}