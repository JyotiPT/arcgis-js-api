// COPYRIGHT © 2019 Esri
//
// All rights reserved under the copyright laws of the United States
// and applicable international laws, treaties, and conventions.
//
// This material is licensed for use under the Esri Master License
// Agreement (MLA), and is bound by the terms of that agreement.
// You may redistribute and use this code without modification,
// provided you adhere to the terms of the MLA and include this
// copyright notice.
//
// See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
//
// For additional information, contact:
// Environmental Systems Research Institute, Inc.
// Attn: Contracts and Legal Services Department
// 380 New York Street
// Redlands, California, USA 92373
// USA
//
// email: contracts@esri.com
//
// See http://js.arcgis.com/4.14/esri/copyright.txt for details.

define(["require","exports","../../../../../../core/tsSupport/makeTemplateObjectHelper","../../shaderModules/interfaces"],function(n,i,e,t){function a(n,i){var a=n.fragment,r=void 0!==i.lightingSphericalHarmonicsOrder?i.lightingSphericalHarmonicsOrder:2;0===r?(a.uniforms.add("lightingAmbientSH0","vec3"),a.code.add(t.glsl(l||(l=e(["\n      /**\n       * @param normal            shading normal in global coordinate space\n       * @param ambientOcclusion  amount of occlusion of the ambient light (1 => full occlusion)\n       */\n      vec3 calculateAmbientIrradiance(vec3 normal, float ambientOcclusion) {\n        vec3 ambientLight = 0.282095 * lightingAmbientSH0;\n        return ambientLight * (1.0 - ambientOcclusion);\n      }\n    "],["\n      /**\n       * @param normal            shading normal in global coordinate space\n       * @param ambientOcclusion  amount of occlusion of the ambient light (1 => full occlusion)\n       */\n      vec3 calculateAmbientIrradiance(vec3 normal, float ambientOcclusion) {\n        vec3 ambientLight = 0.282095 * lightingAmbientSH0;\n        return ambientLight * (1.0 - ambientOcclusion);\n      }\n    "]))))):1===r?(a.uniforms.add("lightingAmbientSH_R","vec4"),a.uniforms.add("lightingAmbientSH_G","vec4"),a.uniforms.add("lightingAmbientSH_B","vec4"),a.code.add(t.glsl(o||(o=e(["\n      vec3 calculateAmbientIrradiance(vec3 normal, float ambientOcclusion) {\n        vec4 sh0 = vec4(\n          0.282095,\n          0.488603 * normal.x,\n          0.488603 * normal.z,\n          0.488603 * normal.y\n        );\n        vec3 ambientLight = vec3(\n          dot(lightingAmbientSH_R, sh0),\n          dot(lightingAmbientSH_G, sh0),\n          dot(lightingAmbientSH_B, sh0)\n        );\n        return ambientLight * (1.0 - ambientOcclusion);\n      }\n    "],["\n      vec3 calculateAmbientIrradiance(vec3 normal, float ambientOcclusion) {\n        vec4 sh0 = vec4(\n          0.282095,\n          0.488603 * normal.x,\n          0.488603 * normal.z,\n          0.488603 * normal.y\n        );\n        vec3 ambientLight = vec3(\n          dot(lightingAmbientSH_R, sh0),\n          dot(lightingAmbientSH_G, sh0),\n          dot(lightingAmbientSH_B, sh0)\n        );\n        return ambientLight * (1.0 - ambientOcclusion);\n      }\n    "]))))):2===r&&(a.uniforms.add("lightingAmbientSH0","vec3"),a.uniforms.add("lightingAmbientSH_R1","vec4"),a.uniforms.add("lightingAmbientSH_G1","vec4"),a.uniforms.add("lightingAmbientSH_B1","vec4"),a.uniforms.add("lightingAmbientSH_R2","vec4"),a.uniforms.add("lightingAmbientSH_G2","vec4"),a.uniforms.add("lightingAmbientSH_B2","vec4"),a.code.add(t.glsl(c||(c=e(["\n      /**\n       * @param normal            shading normal in global coordinate space\n       * @param ambientOcclusion  amount of occlusion of the ambient light (1 => full occlusion)\n       */\n      vec3 calculateAmbientIrradiance(vec3 normal, float ambientOcclusion) {\n        vec3 ambientLight = 0.282095 * lightingAmbientSH0;\n\n        vec4 sh1 = vec4(\n          0.488603 * normal.x,\n          0.488603 * normal.z,\n          0.488603 * normal.y,\n          1.092548 * normal.x * normal.y\n        );\n        vec4 sh2 = vec4(\n          1.092548 * normal.y * normal.z,\n          0.315392 * (3.0 * normal.z * normal.z - 1.0),\n          1.092548 * normal.x * normal.z,\n          0.546274 * (normal.x * normal.x - normal.y * normal.y)\n        );\n        ambientLight += vec3(\n          dot(lightingAmbientSH_R1, sh1),\n          dot(lightingAmbientSH_G1, sh1),\n          dot(lightingAmbientSH_B1, sh1)\n        );\n        ambientLight += vec3(\n          dot(lightingAmbientSH_R2, sh2),\n          dot(lightingAmbientSH_G2, sh2),\n          dot(lightingAmbientSH_B2, sh2)\n        );\n        return ambientLight * (1.0 - ambientOcclusion);\n      }\n    "],["\n      /**\n       * @param normal            shading normal in global coordinate space\n       * @param ambientOcclusion  amount of occlusion of the ambient light (1 => full occlusion)\n       */\n      vec3 calculateAmbientIrradiance(vec3 normal, float ambientOcclusion) {\n        vec3 ambientLight = 0.282095 * lightingAmbientSH0;\n\n        vec4 sh1 = vec4(\n          0.488603 * normal.x,\n          0.488603 * normal.z,\n          0.488603 * normal.y,\n          1.092548 * normal.x * normal.y\n        );\n        vec4 sh2 = vec4(\n          1.092548 * normal.y * normal.z,\n          0.315392 * (3.0 * normal.z * normal.z - 1.0),\n          1.092548 * normal.x * normal.z,\n          0.546274 * (normal.x * normal.x - normal.y * normal.y)\n        );\n        ambientLight += vec3(\n          dot(lightingAmbientSH_R1, sh1),\n          dot(lightingAmbientSH_G1, sh1),\n          dot(lightingAmbientSH_B1, sh1)\n        );\n        ambientLight += vec3(\n          dot(lightingAmbientSH_R2, sh2),\n          dot(lightingAmbientSH_G2, sh2),\n          dot(lightingAmbientSH_B2, sh2)\n        );\n        return ambientLight * (1.0 - ambientOcclusion);\n      }\n    "])))),i.usePBR&&a.code.add(t.glsl(m||(m=e(["\n        // calculateAmbientRadiance is used calculate specular radiance of the sky\n        // - in the night calculateAmbientRadiance gives darker color compared to calculateAmbientComponent which integrates contributions of the moon\n        // - calculateAmbientRadiance gives more predictable color compared to calculateAmbientIrradiance that depends on normal\n        // - in future more physically accurate model should be established\n        vec3 calculateAmbientRadiance(float ssao)\n        {\n          // evaluate the sh ambient light\n          vec3 ambientLight ;\n          ambientLight = 1.2 * (0.282095 * lightingAmbientSH0) - 0.2; // returning the darker value in the night\n\n          return ambientLight *= (1.0 - ssao) * skyTransmittance; // skyTransmittance is slightly bluish giving more natural look\n        }\n      "],["\n        // calculateAmbientRadiance is used calculate specular radiance of the sky\n        // - in the night calculateAmbientRadiance gives darker color compared to calculateAmbientComponent which integrates contributions of the moon\n        // - calculateAmbientRadiance gives more predictable color compared to calculateAmbientIrradiance that depends on normal\n        // - in future more physically accurate model should be established\n        vec3 calculateAmbientRadiance(float ssao)\n        {\n          // evaluate the sh ambient light\n          vec3 ambientLight ;\n          ambientLight = 1.2 * (0.282095 * lightingAmbientSH0) - 0.2; // returning the darker value in the night\n\n          return ambientLight *= (1.0 - ssao) * skyTransmittance; // skyTransmittance is slightly bluish giving more natural look\n        }\n      "])))))}Object.defineProperty(i,"__esModule",{value:!0}),i.EvaluateAmbientLighting=a;var l,o,c,m});