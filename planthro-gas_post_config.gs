var global = {
//  CLIENT_ID: '1073359151363-duno8nuef5s3plv7a83g691msn9k50ua.apps.googleusercontent.com',
//  CLIENT_SECRET: 'lvqsxngNpREmQfXZZDMv9y_p',
//  BLOG_Id: '3016253585513797144'
};

// Sets authentication information to PropertiesService
function setAuthValues(){
  // Logger.log("Setting auth values....");
  // Following are credentials for Planthro Blogger ID
  PropertiesService.getScriptProperties().setProperty('CLIENT_ID','1073359151363-duno8nuef5s3plv7a83g691msn9k50ua.apps.googleusercontent.com');
  PropertiesService.getScriptProperties().setProperty('CLIENT_SECRET','lvqsxngNpREmQfXZZDMv9y_p');
  PropertiesService.getScriptProperties().setProperty('BLOG_Id','8894679474271622220');
  // production blog ID 8894679474271622220; dev blog ID 3016253585513797144
}

global.sections = {};
global.citelinks = [];
global.filter_citelinks = [];
global.citelinks_copy = [];

global.topics = [
//0001-0005
// {"language":"en","title":"Anthropocene"},
// {"language":"en","title":"Geologic_time_scale"},
// {"language":"en","title":"Earth_science"},
// {"language":"en","title":"Human_impact_on_the_environment"},
// {"language":"en","title":"Sustainability"},

//0006-0010
// {"language":"en","title":"Global_catastrophic_risk"},
// {"language":"en","title":"Ecosystem"},
// {"language":"en","title":"Holocene"},
// {"language":"en","title":"Domestication"},
// {"language":"en","title":"Earth_system_science"},

//0011-0015
// {"language":"en","title":"Pollution"},
// {"language":"en","title":"Ocean_acidification"},
// {"language":"en","title":"Human_ecology"},
// {"language":"en","title":"Planetary_boundaries"},
// {"language":"en","title":"Greenhouse_gas"},

//0016-0020 
// {"language":"en","title":"Industrial_Revolution"},
// {"language":"en","title":"Great_Acceleration"},
// {"language":"en","title":"Degrowth"},
// {"language":"en","title":"Tragedy_of_the_commons"},
// {"language":"en","title":"Ecological_footprint"},

//0021-0025  
// {"language":"en","title":"Biodiversity_loss"},
// {"language":"en","title":"Global_warming"},
// {"language":"en","title":"Climate_engineering"},
// {"language":"en","title":"Neolithic_Revolution"},
// {"language":"en","title":"Anthropogenic_biome"},

//0026-0030
// {"language":"en","title":"Intergovernmental_Panel_on_Climate_Change"},
// {"language":"en","title":"Sustainable_forest_management"},
// {"language":"en","title":"Defaunation"},
// {"language":"en","title":"Control_of_fire_by_early_humans"},
// {"language":"en","title":"Geobiology"},

//0031-0035
// {"language":"en","title":"Plastic_pollution"},
// {"language":"en","title":"Water_scarcity"},
// {"language":"en","title":"Millennium_Development_Goals"},
// {"language":"en","title":"Environmental_impact_of_meat_production"},
// {"language":"en","title":"Environmental_impact_of_aviation"},

//0031-0035
// {"language":"en","title":"Environmental_impact_of_reservoirs"},
// {"language":"en","title":"Environmental_impact_of_agriculture"},
// {"language":"en","title":"Environmental_impact_of_the_energy_industry"},
// {"language":"en","title":"Environmental_impact_of_fishing"},
// {"language":"en","title":"Environmental_impact_of_irrigation"},

//0036-0040
// {"language":"en","title":"Environmental_impact_of_mining"},
// {"language":"en","title":"Environmental_impact_of_paint"},
// {"language":"en","title":"Environmental_impact_of_paper"},
// {"language":"en","title":"Environmental_impact_of_pesticides"},
// {"language":"en","title":"Impact_of_nanotechnology"},

//0041-0045
// {"language":"en","title":"Environmental_impact_of_shipping"},
// {"language":"en","title":"Environmental_impact_of_war"},
// {"language":"en","title":"Environmental_impact_of_wind_power"},
// {"language":"en","title":"Carbon_capture_and_storage"},
// {"language":"en","title":"Climate_change_mitigation"},

//0046-0050
// {"language":"en","title":"Efficient_energy_use"},
// {"language":"en","title":"Cogeneration"},
// {"language":"en","title":"Electric_vehicle"},
// {"language":"en","title":"Energy_conversion_efficiency"},
// {"language":"en","title":"Energy_development"},

//0051-0055
// {"language":"en","title":"Energy_storage"},
// {"language":"en","title":"Negawatt_power"},
// {"language":"en","title":"Passive_house"},
// {"language":"en","title":"Light_pollution"},
// {"language":"en","title":"Noise_pollution"},

//0056-0060
// {"language":"en","title":"Polarized_light_pollution"},
// {"language":"en","title":"Dark-sky_preserve"},
// {"language":"en","title":"Peak_oil"},
// {"language":"en","title":"Renewable_heat"},
// {"language":"en","title":"Sustainable_architecture"},

//0061-0065
// {"language":"en","title":"Green_building"},
// {"language":"en","title":"Zero-energy_building"},
// {"language":"en","title":"Off-the-grid"},
// {"language":"en","title":"Water_pollution"},
// {"language":"en","title":"Water_footprint"},

//0066-0070
// {"language":"en","title":"Water_security"},
// {"language":"en","title":"Peak_water"},
// {"language":"en","title":"Shale_gas"},
// {"language":"en","title":"2000s_commodities_boom"},
// {"language":"en","title":"Ecological_economics"},

//0071-0075
// {"language":"en","title":"Low-carbon_economy"},
// {"language":"en","title":"Age_of_Oil"},
// {"language":"en","title":"Overconsumption"},
// {"language":"en","title":"Peak_coal"},
// {"language":"en","title":"Peak_copper"},

//0076-0080
// {"language":"en","title":"Peak_gas"},
// {"language":"en","title":"Nuclear_power"},
// {"language":"en","title":"Peak_uranium"},
// {"language":"en","title":"Soft_energy_path"},
// {"language":"en","title":"Peak_phosphorus"},

//0086-0090
// {"language":"en","title":"Raw_material"},
// {"language":"en","title":"Downcycling"},
// {"language":"en","title":"Industrial_ecology"},
// {"language":"en","title":"Reusable_shopping_bag"},
// {"language":"en","title":"Waste_minimisation"},

//0091-0095
// {"language":"en","title":"Repurposing"},
// {"language":"en","title":"Scrap"},
// {"language":"en","title":"Bottled_water"},
// {"language":"en","title":"Reusable_packaging"},
// {"language":"en","title":"Green_Revolution"},

//0096-0100
// {"language":"en","title":"Nitrogen_cycle"},
// {"language":"en","title":"Carbon_cycle"},
// {"language":"en","title":"Biogeochemical_cycle"},
// {"language":"en","title":"Carbon_sequestration"},
// {"language":"en","title":"Gaia_hypothesis},
];

global.links = [
  {"link":"/wiki/Anthropocene","replacement":"/2019/01/anthropocene-planthro-anthropocene.html"},
  {"link":"/wiki/Geologic_time_scale","replacement":"/2019/01/anthropocene-planthro-geologic-time-scale.html"},
  {"link":"/wiki/Earth_science","replacement":"/2019/01/anthropocene-planthro-earth-science.html"},
  {"link":"/wiki/Human_impact_on_the_environment","replacement":"/2019/01/anthropocene-planthro-human-impact-on-the-environment.html"},
  {"link":"/wiki/Sustainability","replacement":"/2019/01/anthropocene-planthro-sustainability.html"},
  {"link":"/wiki/Global_catastrophic_risk","replacement":"/2019/01/anthropocene-planthro-global-catastrophic-risk.html"},
  {"link":"/wiki/Ecosystem","replacement":"/2019/01/anthropocene-planthro-ecosystem.html"},
  {"link":"/wiki/Holocene","replacement":"/2019/01/anthropocene-planthro-holocene.html"},
  {"link":"/wiki/Domestication","replacement":"/2019/01/anthropocene-planthro-domestication.html"},
  {"link":"/wiki/Earth_system_science","replacement":"/2019/01/anthropocene-planthro-earth-system-science.html"},
  {"link":"/wiki/Pollution","replacement":"/2019/01/anthropocene-planthro-pollution.html"},
  {"link":"/wiki/Ocean_acidification","replacement":"/2019/01/anthropocene-planthro-ocean-acidification.html"},
  {"link":"/wiki/Human_ecology","replacement":"/2019/01/anthropocene-planthro-human-ecology.html"},
  {"link":"/wiki/Planetary_boundaries","replacement":"/2019/01/anthropocene-planthro-planetary-boundaries.html"},
  {"link":"/wiki/Greenhouse_gas","replacement":"/2019/01/anthropocene-planthro-greenhouse-gas.html"},
  {"link":"/wiki/Industrial_Revolution","replacement":"/2019/01/anthropocene-planthro-industrial-revolution.html"},
  {"link":"/wiki/Great_Acceleration","replacement":"/2019/01/anthropocene-planthro-great-acceleration.html"},
  {"link":"/wiki/Degrowth","replacement":"/2019/01/anthropocene-planthro-degrowth.html"},
  {"link":"/wiki/Tragedy_of_the_commons","replacement":"/2019/01/anthropocene-planthro-tragedy-of-the-commons.html"},
  {"link":"/wiki/Ecological_footprint","replacement":"/2019/01/anthropocene-planthro-ecological-footprint.html"},
  {"link":"/wiki/Biodiversity_loss","replacement":"/2019/01/anthropocene-planthro-biodiversity-loss.html"},
  {"link":"/wiki/Global_warming","replacement":"/2019/01/anthropocene-planthro-global-warming.html"},
  {"link":"/wiki/Climate_engineering","replacement":"/2019/01/anthropocene-planthro-climate-engineering.html"},
  {"link":"/wiki/Neolithic_Revolution","replacement":"/2019/01/anthropocene-planthro-neolithic-revolution.html"},
  {"link":"/wiki/Anthropogenic_biome","replacement":"/2019/01/anthropocene-planthro-anthropogenic-biome.html"},
  {"link":"/wiki/Intergovernmental_Panel_on_Climate_Change","replacement":"/2019/01/anthropocene-planthro-intergovernmental-panel-on-climate-change.html"},
  {"link":"/wiki/Sustainable_forest_management","replacement":"/2019/01/anthropocene-planthro-sustainable-forest-management.html"},
  {"link":"/wiki/Defaunation","replacement":"/2019/01/anthropocene-planthro-defaunation.html"},
  {"link":"/wiki/Control_of_fire_by_early_humans","replacement":"/2019/01/anthropocene-planthro-control-of-fire-by-early-humans.html"},
  {"link":"/wiki/Geobiology","replacement":"/2019/01/anthropocene-planthro-geobiology.html"},
  {"link":"/wiki/Plastic_pollution","replacement":"/2019/01/anthropocene-planthro-plastic-pollution.html"},
  {"link":"/wiki/Water_scarcity","replacement":"/2019/01/anthropocene-planthro-water-scarcity.html"},
  {"link":"/wiki/Millennium_Development_Goals","replacement":"/2019/01/anthropocene-planthro-millennium-development-goals.html"},
  {"link":"/wiki/Environmental_impact_of_meat_production","replacement":"/2019/01/anthropocene-planthro-environmental-impact-of-meat-production.html"},
  {"link":"/wiki/Environmental_impact_of_aviation","replacement":"/2019/01/anthropocene-planthro-environmental-impact-of-aviation.html"},
  {"link":"/wiki/Environmental_impact_of_reservoirs","replacement":"/2019/01/anthropocene-planthro-environmental-impact-of-reservoirs.html"},
  {"link":"/wiki/Environmental_impact_of_agriculture","replacement":"/2019/01/anthropocene-planthro-environmental-impact-of-agriculture.html"},
  {"link":"/wiki/Environmental_impact_of_the_energy_industry","replacement":"/2019/01/anthropocene-planthro-environmental-impact-of-the-energy-industry.html"},
  {"link":"/wiki/Environmental_impact_of_fishing","replacement":"/2019/01/anthropocene-planthro-environmental-impact-of-fishing.html"},
  {"link":"/wiki/Environmental_impact_of_irrigation","replacement":"/2019/01/anthropocene-planthro-environmental-impact-of-irrigation.html"},
  {"link":"/wiki/Environmental_impact_of_mining","replacement":"/2019/01/anthropocene-planthro-environmental-impact-of-mining.html"},
  {"link":"/wiki/Environmental_impact_of_paint","replacement":"/2019/01/anthropocene-planthro-environmental-impact-of-paint.html"},
  {"link":"/wiki/Environmental_impact_of_paper","replacement":"/2019/01/anthropocene-planthro-environmental-impact-of-paper.html"},
  {"link":"/wiki/Environmental_impact_of_pesticides","replacement":"/2019/01/anthropocene-planthro-environmental-impact-of-pesticides.html"},
  {"link":"/wiki/Impact_of_nanotechnology","replacement":"/2019/01/anthropocene-planthro-impact-of-nanotechnology.html"},
  {"link":"/wiki/Environmental_impact_of_shipping","replacement":"/2019/01/anthropocene-planthro-environmental-impact-of-shipping.html"},
  {"link":"/wiki/Environmental_impact_of_war","replacement":"/2019/01/anthropocene-planthro-environmental-impact-of-war.html"},
  {"link":"/wiki/Environmental_impact_of_wind_power","replacement":"/2019/01/anthropocene-planthro-environmental-impact-of-wind-power.html"},
  {"link":"/wiki/Carbon_capture_and_storage","replacement":"/2019/01/anthropocene-planthro-carbon-capture-and-storage.html"},
  {"link":"/wiki/Climate_change_mitigation","replacement":"/2019/01/anthropocene-planthro-climate-change-mitigation.html"},
  {"link":"/wiki/Efficient_energy_use","replacement":"/2019/01/anthropocene-planthro-efficient-energy-use.html"},
  {"link":"/wiki/Cogeneration","replacement":"/2019/01/anthropocene-planthro-cogeneration.html"},
  {"link":"/wiki/Electric_vehicle","replacement":"/2019/01/anthropocene-planthro-electric-vehicle.html"},
  {"link":"/wiki/Energy_conversion_efficiency","replacement":"/2019/01/anthropocene-planthro-energy-conversion-efficiency.html"},
  {"link":"/wiki/Energy_development","replacement":"/2019/01/anthropocene-planthro-energy-development.html"},
  {"link":"/wiki/Energy_storage","replacement":"/2019/01/anthropocene-planthro-energy-storage.html"},
  {"link":"/wiki/Negawatt_power","replacement":"/2019/01/anthropocene-planthro-negawatt-power.html"},
  {"link":"/wiki/Passive_house","replacement":"/2019/01/anthropocene-planthro-passive-house.html"},
  {"link":"/wiki/Light_pollution","replacement":"/2019/01/anthropocene-planthro-light-pollution.html"},
  {"link":"/wiki/Noise_pollution","replacement":"/2019/01/anthropocene-planthro-noise-pollution.html"},
  {"link":"/wiki/Polarized_light_pollution","replacement":"/2019/01/anthropocene-planthro-polarized-light-pollution.html"},
  {"link":"/wiki/Dark-sky_preserve","replacement":"/2019/01/anthropocene-planthro-dark-sky-preserve.html"},
  {"link":"/wiki/Peak_oil","replacement":"/2019/01/anthropocene-planthro-peak-oil.html"},
  {"link":"/wiki/Renewable_heat","replacement":"/2019/01/anthropocene-planthro-renewable-heat.html"},
  {"link":"/wiki/Sustainable_architecture","replacement":"/2019/01/anthropocene-planthro-sustainable-architecture.html"},
  {"link":"/wiki/Green_building","replacement":"/2019/01/anthropocene-planthro-green-building.html"},
  {"link":"/wiki/Zero-energy_building","replacement":"/2019/01/anthropocene-planthro-zero-energy-building.html"},
  {"link":"/wiki/Off-the-grid","replacement":"/2019/01/anthropocene-planthro-off-the-grid.html"},
  {"link":"/wiki/Water_pollution","replacement":"/2019/01/anthropocene-planthro-water-pollution.html"},
  {"link":"/wiki/Water_footprint","replacement":"/2019/01/anthropocene-planthro-water-footprint.html"},
  {"link":"/wiki/Water_security","replacement":"/2019/01/anthropocene-planthro-water-security.html"},
  {"link":"/wiki/Peak_water","replacement":"/2019/01/anthropocene-planthro-peak-water.html"},
  {"link":"/wiki/Shale_gas","replacement":"/2019/01/anthropocene-planthro-shale-gas.html"},
  {"link":"/wiki/2000s_commodities_boom","replacement":"/2019/01/anthropocene-planthro-2000s-commodities-boom.html"},
  {"link":"/wiki/Ecological_economics","replacement":"/2019/01/anthropocene-planthro-ecological-economics.html"},
  {"link":"/wiki/Low-carbon_economy","replacement":"/2019/01/anthropocene-planthro-low-carbon-economy.html"},
  {"link":"/wiki/Age_of_Oil","replacement":"/2019/01/anthropocene-planthro-age-of-oil.html"},
  {"link":"/wiki/Overconsumption","replacement":"/2019/01/anthropocene-planthro-overconsumption.html"},
  {"link":"/wiki/Peak_coal","replacement":"/2019/01/anthropocene-planthro-peak-coal.html"},
  {"link":"/wiki/Peak_copper","replacement":"/2019/01/anthropocene-planthro-peak-copper.html"},
  {"link":"/wiki/Peak_gas","replacement":"/2019/01/anthropocene-planthro-peak-gas.html"},
  {"link":"/wiki/Nuclear_power","replacement":"/2019/01/anthropocene-planthro-nuclear-power.html"},
  {"link":"/wiki/Peak_uranium","replacement":"/2019/01/anthropocene-planthro-peak-uranium.html"},
  {"link":"/wiki/Soft_energy_path","replacement":"/2019/01/anthropocene-planthro-soft-energy-path.html"},
  {"link":"/wiki/Peak_phosphorus","replacement":"/2019/01/anthropocene-planthro-peak-phosphorus.html"},
  {"link":"/wiki/Raw_material","replacement":"/2019/01/anthropocene-planthro-raw-material.html"},
  {"link":"/wiki/Downcycling","replacement":"/2019/01/anthropocene-planthro-downcycling.html"},
  {"link":"/wiki/Industrial_ecology","replacement":"/2019/01/anthropocene-planthro-industrial-ecology.html"},
  {"link":"/wiki/Reusable_shopping_bag","replacement":"/2019/01/anthropocene-planthro-reusable-shopping-bag.html"},
  {"link":"/wiki/Waste_minimisation","replacement":"/2019/01/anthropocene-planthro-waste-minimisation.html"},
  {"link":"/wiki/Repurposing","replacement":"/2019/01/anthropocene-planthro-repurposing.html"},
  {"link":"/wiki/Scrap","replacement":"/2019/01/anthropocene-planthro-scrap.html"},
  {"link":"/wiki/Bottled_water","replacement":"/2019/01/anthropocene-planthro-bottled-water.html"},
  {"link":"/wiki/Reusable_packaging","replacement":"/2019/01/anthropocene-planthro-reusable-packaging.html"},
  {"link":"/wiki/Green_Revolution","replacement":"/2019/01/anthropocene-planthro-green-revolution.html"},
  {"link":"/wiki/Nitrogen_cycle","replacement":"/2019/01/anthropocene-planthro-nitrogen-cycle.html"},
  {"link":"/wiki/Carbon_cycle","replacement":"/2019/01/anthropocene-planthro-carbon-cycle.html"},
  {"link":"/wiki/Biogeochemical_cycle","replacement":"/2019/01/anthropocene-planthro-biogeochemical-cycle.html"},
  {"link":"/wiki/Carbon_sequestration","replacement":"/2019/01/anthropocene-planthro-carbon-sequestration.html"},
  {"link":"/wiki/Gaia_hypothesis","replacement":"/2019/01/anthropocene-planthro-gaia-hypothesis.html"}
//  {"link":"", "replacement":""}
];

function getService() {
  // Create a new service with the given name. The name will be used when
  // persisting the authorized token, so ensure it is unique within the
  // scope of the property store.
  return OAuth2.createService('blogger')

      // Set the endpoint URLs, which are the same for all Google services.
      .setAuthorizationBaseUrl('https://accounts.google.com/o/oauth2/auth')
      .setTokenUrl('https://accounts.google.com/o/oauth2/token')
      
      // Set the client ID and secret, from the Google Developers Console.
      .setClientId(PropertiesService.getScriptProperties().getProperty('CLIENT_ID'))
      .setClientSecret(PropertiesService.getScriptProperties().getProperty('CLIENT_SECRET'))
//      .setClientId(global.CLIENT_ID)
//      .setClientSecret(global.CLIENT_SECRET)

      // Set the name of the callback function in the script referenced
      // above that should be invoked to complete the OAuth flow.
      .setCallbackFunction('authCallback')

      // Set the property store where authorized tokens should be persisted.
      .setPropertyStore(PropertiesService.getUserProperties())

      // Set the scopes to request (space-separated for Google services).
      // this is blogger read only scope for write access is:
      // https://www.googleapis.com/auth/blogger
      //.setScope('https://www.googleapis.com/auth/blogger.readonly') readonly scope
      .setScope('https://www.googleapis.com/auth/blogger')

      // Below are Google-specific OAuth2 parameters.

      // Sets the login hint, which will prevent the account chooser screen
      // from being shown to users logged in with multiple accounts.
      .setParam('login_hint', Session.getActiveUser().getEmail())
      
      // Requests offline access.
      .setParam('access_type', 'offline')

      // Forces the approval prompt every time. This is useful for testing,
      // but not desirable in a production application.
      .setParam('approval_prompt', 'force');
}

function authCallback(request) {
  var bloggerService = getService();
  var isAuthorized = bloggerService.handleCallback(request);
  if (isAuthorized) {
    return HtmlService.createHtmlOutput('Success! You can close this tab.');
  } else {
    return HtmlService.createHtmlOutput('Denied. You can close this tab');
  }
}