import React, { useState } from "react";

const agentsData = {
  direction: {
    id: "athena",
    name: "ATHÉNA",
    role: "Directrice Générale",
    description:
      "Direction générale et pilotage stratégique de Blue Planet World",
    color: "#FF6B6B",
  },
  supportTransversal: [
    {
      id: "dumbledore",
      name: "DUMBLEDORE",
      role: "Intelligence d'Affaires",
      description:
        "Analyse stratégique, insights marché et intelligence compétitive",
      color: "#4ECDC4",
    },
    {
      id: "hestia",
      name: "HESTIA",
      role: "Ressources Humaines",
      description:
        "Gestion des talents, développement organisationnel et bien-être",
      color: "#45B7D1",
    },
    {
      id: "picsou",
      name: "PICSOU",
      role: "Comptabilité & Finance",
      description: "Gestion financière, reporting et conformité comptable",
      color: "#FFA502",
    },
  ],
  activites: {
    conciergerie: {
      id: "conciergerie",
      name: "CONCIERGERIE",
      color: "#9B59B6",
      chef: {
        id: "morgane",
        name: "MORGANE",
        role: "Chef de Service Conciergerie",
        description: "Gestion globale des services de conciergerie premium",
      },
      agents: [
        {
          id: "scout",
          name: "SCOUT",
          role: "Web Scraper & Data Collector",
          description: "Recherche et collecte de données immobilières",
        },
        {
          id: "david",
          name: "DAVID",
          role: "Contact Manager",
          description: "Gestion des contacts et relations propriétaires",
        },
        {
          id: "andrea",
          name: "ANDREA",
          role: "Service Coordinator",
          description: "Coordination des services et suivi client",
        },
      ],
    },
    bluePlanet: {
      id: "blueplanet",
      name: "BLUE PLANET APP",
      color: "#3498DB",
      chef: {
        id: "nova",
        name: "NOVA",
        role: "Chef de Produit App",
        description: "Leadership et innovation sur l'app Blue Planet",
      },
      agents: [
        {
          id: "alexis",
          name: "ALEXIS",
          role: "Feature Developer",
          description: "Développement des nouvelles fonctionnalités",
        },
        {
          id: "leo",
          name: "LÉO",
          role: "API Manager",
          description: "Gestion des intégrations API et connecteurs",
        },
        {
          id: "clara",
          name: "CLARA",
          role: "UX/UI Designer",
          description: "Design et expérience utilisateur",
        },
        {
          id: "saga",
          name: "SAGA",
          role: "Analytics & Insights",
          description: "Analyse des données utilisateurs et comportements",
        },
      ],
    },
    blnBeauty: {
      id: "blnbeauty",
      name: "BLN BEAUTY",
      color: "#E74C3C",
      chef: {
        id: "emilie",
        name: "ÉMILIE",
        role: "Chef de Marque Beauty",
        description: "Gestion globale de la marque BLN Beauty",
      },
      agents: [
        {
          id: "calypso",
          name: "CALYPSO",
          role: "Trend Analyzer",
          description: "Analyse des tendances beauté et cosmétiques",
        },
        {
          id: "buffy",
          name: "BUFFY",
          role: "Influencer Manager",
          description: "Gestion des partenariats influenceurs",
        },
        {
          id: "falkor",
          name: "FALKOR",
          role: "Content Creator",
          description: "Création de contenu beauté et tutoriels",
        },
        {
          id: "atreyu",
          name: "ATREYU",
          role: "E-Commerce Manager",
          description: "Gestion des ventes en ligne et catalogue",
        },
        {
          id: "louane",
          name: "LOUANE",
          role: "Customer Success",
          description: "Support client et satisfaction",
        },
      ],
    },
    pochettesSupprises: {
      id: "pochettes",
      name: "POCHETTES SURPRISES",
      color: "#F39C12",
      chef: {
        id: "selene",
        name: "SÉLÉNÉ",
        role: "Chef de Produit Pochettes",
        description: "Conception et gestion de la gamme Pochettes Surprises",
      },
      agents: [
        {
          id: "pikachu",
          name: "PIKACHU",
          role: "Curator & Selector",
          description: "Sélection des produits et thématiques",
        },
        {
          id: "evoli",
          name: "EVOLI",
          role: "Packaging Designer",
          description: "Design et création des pochettes",
        },
        {
          id: "mewto",
          name: "MEWTO",
          role: "Logistics Coordinator",
          description: "Gestion des stocks et expéditions",
        },
      ],
    },
    machinesaPeluches: {
      id: "machines",
      name: "MACHINES À PELUCHES",
      color: "#16A085",
      chef: {
        id: "luna",
        name: "LUNA",
        role: "Chef de Projet Machines",
        description: "Gestion des machines à peluches et exploitation",
      },
      agents: [
        {
          id: "denver",
          name: "DENVER",
          role: "Hardware Manager",
          description: "Maintenance et support hardware des machines",
        },
        {
          id: "casper",
          name: "CASPER",
          role: "Software Developer",
          description: "Développement des systèmes de contrôle",
        },
        {
          id: "willy",
          name: "WILLY",
          role: "Location Scout",
          description: "Prospection et placement des machines",
        },
        {
          id: "eliot",
          name: "ELIOT",
          role: "Revenue Optimizer",
          description: "Optimisation des revenus et analytics",
        },
      ],
    },
    agentsIAB2B: {
      id: "agents-ia-b2b",
      name: "AGENTS IA B2B",
      color: "#8E44AD",
      chef: {
        id: "hermione",
        name: "HERMIONE",
        role: "Chef de Département IA B2B",
        description: "Leadership de la solution d'agents IA pour entreprises",
      },
      agents: [
        {
          id: "harry",
          name: "HARRY",
          role: "Solution Architect",
          description: "Architecture des solutions IA customisées",
        },
        {
          id: "ron",
          name: "RON",
          role: "Client Success Manager",
          description: "Implémentation et support clients B2B",
        },
      ],
    },
  },
};

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
    new Set(),
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
    <div className="organigramme-container" style={{ padding: "20px" }}>
      <div className="direction-section" style={{ marginBottom: "40px" }}>
        <div
          style={{
            backgroundColor: agentsData.direction.color,
            padding: "20px",
            borderRadius: "8px",
            color: "white",
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          <h2 style={{ margin: "0 0 8px 0" }}>{agentsData.direction.name}</h2>
          <p style={{ margin: "0", fontSize: "14px", opacity: 0.9 }}>
            {agentsData.direction.role}
          </p>
          <p style={{ margin: "8px 0 0 0", fontSize: "12px", opacity: 0.8 }}>
            {agentsData.direction.description}
          </p>
        </div>

        <div style={{ marginBottom: "30px" }}>
          <h3 style={{ marginBottom: "15px", color: "#333" }}>
            🔧 Fonctions Transversales
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "15px",
            }}
          >
            {agentsData.supportTransversal.map((agent) => (
              <div
                key={agent.id}
                style={{
                  backgroundColor: agent.color,
                  padding: "15px",
                  borderRadius: "6px",
                  color: "white",
                }}
              >
                <h4 style={{ margin: "0 0 5px 0", fontSize: "16px" }}>
                  {agent.name}
                </h4>
                <p
                  style={{
                    margin: "0 0 8px 0",
                    fontSize: "12px",
                    opacity: 0.9,
                  }}
                >
                  {agent.role}
                </p>
                <p style={{ margin: "0", fontSize: "11px", opacity: 0.8 }}>
                  {agent.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ marginTop: "40px" }}>
        <h3 style={{ marginBottom: "20px", color: "#333" }}>
          📊 Activités Métier
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
          }}
        >
          {activities.map((activity) => (
            <div
              key={activity.id}
              style={{
                border: `2px solid ${activity.color}`,
                borderRadius: "8px",
                overflow: "hidden",
              }}
            >
              <button
                onClick={() => toggleActivity(activity.id)}
                style={{
                  backgroundColor: activity.color,
                  color: "white",
                  padding: "15px",
                  border: "none",
                  width: "100%",
                  textAlign: "left",
                  cursor: "pointer",
                  fontSize: "16px",
                  fontWeight: "bold",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span>{activity.name}</span>
                <span style={{ fontSize: "12px" }}>
                  {expandedActivities.has(activity.id) ? "▼" : "▶"}
                </span>
              </button>

              {expandedActivities.has(activity.id) && (
                <div style={{ padding: "15px", backgroundColor: "#f9f9f9" }}>
                  <div style={{ marginBottom: "15px" }}>
                    <div
                      style={{
                        backgroundColor: activity.color,
                        color: "white",
                        padding: "12px",
                        borderRadius: "4px",
                        marginBottom: "10px",
                      }}
                    >
                      <h4 style={{ margin: "0 0 5px 0" }}>
                        👔 {activity.chef.name}
                      </h4>
                      <p style={{ margin: "0 0 5px 0", fontSize: "12px" }}>
                        {activity.chef.role}
                      </p>
                      <p
                        style={{ margin: "0", fontSize: "11px", opacity: 0.9 }}
                      >
                        {activity.chef.description}
                      </p>
                    </div>
                  </div>
                  {activity.agents.length > 0 && (
                    <div>
                      <p
                        style={{
                          margin: "0 0 10px 0",
                          fontSize: "12px",
                          fontWeight: "bold",
                          color: "#666",
                        }}
                      >
                        Agents spécialisés:
                      </p>
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr",
                          gap: "8px",
                        }}
                      >
                        {activity.agents.map((agent) => (
                          <div
                            key={agent.id}
                            style={{
                              backgroundColor: "#fff",
                              border: `1px solid ${activity.color}`,
                              padding: "10px",
                              borderRadius: "4px",
                              fontSize: "11px",
                            }}
                          >
                            <p
                              style={{
                                margin: "0 0 3px 0",
                                fontWeight: "bold",
                                color: "#333",
                              }}
                            >
                              🤖 {agent.name}
                            </p>
                            <p
                              style={{
                                margin: "0 0 3px 0",
                                fontSize: "10px",
                                color: "#666",
                              }}
                            >
                              {agent.role}
                            </p>
                            <p
                              style={{
                                margin: "0",
                                fontSize: "9px",
                                color: "#999",
                              }}
                            >
                              {agent.description}
                            </p>
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
