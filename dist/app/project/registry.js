// Knoblab Project Registry
window.projectsMap = window.projectsMap || {};
window.projectsList = window.projectsList || [];

window.registerProject = function(project) {
  if (!project || !project.id) return;
  window.projectsMap[project.id] = project;
  const idx = window.projectsList.findIndex(p => p.id === project.id);
  if (idx >= 0) {
    window.projectsList[idx] = project;
  } else {
    window.projectsList.push(project);
  }
  window.projectsData = window.projectsList; // 하위 호환성 유지
};
