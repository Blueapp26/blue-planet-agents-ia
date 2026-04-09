import React, { useState } from 'react';
import agentsData from '../constants/agents-organigramme.json';

interface Agent {
  id: string;
  name: string;
  role: string;
  description: string;
}

interface Activity {
  id: string;
  name: string;
  color: string;
  chef: Agent;
  agents: Agent[];
}

export default function OrganigrammeAgents() {
  const [expandedActivities, setExpandedActivities] = useState<Set<string>>(
    new Set()
  );

  const toggleActivity = (activityId: string) => {
    const newExpanded = new Set(expandedActivities);
    if (newExpanded.has(activityId)) {
      newExpanded.delete(activityId);
    } else {
      newExpanded.add(activityId);
    }
    setExpandedActivities(newExpanded);
  };

  const activities: Activity[] = Object.values(agentsData.activites);

  return (
    <div className="organigramme-container" style={{ padding: '20px' }}>
      <div className="direction-section" style={{ marginBottom: '40px' }}>
        <div style={{ backgroundColor: agentsData.direction.color, padding: '20px', borderRadius: '8px', color: 'white', textAlign: 'center', marginBottom: '20px' }}>
          <h2 style={{ margin: '0 0 8px 0' }}>{agentsData.direction.name}</h2>
          <p style={{ margin: '0', fontSize: '14px', opacity: 0.9 }}>{agentsData.direction.role}</p>
          <p style={{ margin: '8px 0 0 0', fontSize: '12px', opacity: 0.8 }}>{agentsData.direction.description}</p>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ marginBottom: '15px', color: '#333' }}>🔧 Fonctions Transversales</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px' }}>
            {agentsData.supportTransversal.map((agent) => (
              <div key={agent.id} style={{ backgroundColor: agent.color, padding: '15px', borderRadius: '6px', color: 'white' }}>
                <h4 style={{ margin: '0 0 5px 0', fontSize: '16px' }}>{agent.name}</h4>
                <p style={{ margin: '0 0 8px 0', fontSize: '12px', opacity: 0.9 }}>{agent.role}</p>
                <p style={{ margin: '0', fontSize: '11px', opacity: 0.8 }}>{agent.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ marginTop: '40px' }}>
        <h3 style={{ marginBottom: '20px', color: '#333' }}>📊 Activités Métier</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          {activities.map((activity) => (
            <div key={activity.id} style={{ border: `2px solid ${activity.color}`, borderRadius: '8px', overflow: 'hidden' }}>
              <button onClick={() => toggleActivity(activity.id)} style={{ backgroundColor: activity.color, color: 'white', padding: '15px', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>{activity.name}</span>
                <span style={{ fontSize: '12px' }}>{expandedActivities.has(activity.id) ? '▼' : '▶'}</span>
              </button>

              {expandedActivities.has(activity.id) && (
                <div style={{ padding: '15px', backgroundColor: '#f9f9f9' }}>
                  <div style={{ marginBottom: '15px' }}>
                    <div style={{ backgroundColor: activity.color, color: 'white', padding: '12px', borderRadius: '4px', marginBottom: '10px' }}>
                      <h4 style={{ margin: '0 0 5px 0' }}>👔 {activity.chef.name}</h4>
                      <p style={{ margin: '0 0 5px 0', fontSize: '12px' }}>{activity.chef.role}</p>
                      <p style={{ margin: '0', fontSize: '11px', opacity: 0.9 }}>{activity.chef.description}</p>
                    </div>
                  </div>
                  {activity.agents.length > 0 && (
                    <div>
                      <p style={{ margin: '0 0 10px 0', fontSize: '12px', fontWeight: 'bold', color: '#666' }}>Agents spécialisés:</p>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                        {activity.agents.map((agent) => (
                          <div key={agent.id} style={{ backgroundColor: '#fff', border: `1px solid ${activity.color}`, padding: '10px', borderRadius: '4px', fontSize: '11px' }}>
                            <p style={{ margin: '0 0 3px 0', fontWeight: 'bold', color: '#333' }}>🤖 {agent.name}</p>
                            <p style={{ margin: '0 0 3px 0', fontSize: '10px', color: '#666' }}>{agent.role}</p>
                            <p style={{ margin: '0', fontSize: '9px', color: '#999' }}>{agent.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
