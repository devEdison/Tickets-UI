export default {
  /**
   * @type {boolean} true | false
   * @description Whether show the settings right-panel
   */
  showSettings: true,
  // Si solo desea mostrar el panel de configuración del sistema en el entorno de desarrollo, pero no en el entorno de producción, abra la siguiente línea de código
  // showSettings: process.env.NODE_ENV === "development",

  /**
   * @type {boolean} true | false
   * @description Whether show the logo in sidebar
   */
  sidebarLogo: true,

  /**
   * @type {boolean} true | false
   * @description Whether fix the header
   */
  fixedHeader: false,
  
  /**
   * @type {boolean} true | false
   * @description Whether need tagsView
   */
  tagsView: true,
};



