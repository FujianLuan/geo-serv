const key=`HH2BZ-SQT6W-KEHRL-OHWUV-ZCHNH-3CFSQ`
const qqApi={
    latLngByIp:`https://apis.map.qq.com/ws/location/v1/ip?key=${key}`,
    latLngByAddr:`https://apis.map.qq.com/ws/geocoder/v1/?address=@addr&key=${key}`,
    distance:`http://apis.map.qq.com/ws/distance/v1/matrix/?mode=driving&from=@from&to=@to&key=${key}`
}
module.exports = qqApi;