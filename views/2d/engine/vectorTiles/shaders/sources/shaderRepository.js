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

define(["require","exports"],function(e,n){return{background:{"background.frag":"#ifdef PATTERN\nuniform lowp float u_opacity;\nuniform mediump vec2 u_pattern_tl;\nuniform mediump vec2 u_pattern_br;\nuniform sampler2D u_texture;\nvarying mediump vec2 v_tileTextureCoord;\n#else\nuniform lowp vec4 u_color;\n#endif\n#ifdef ID\nvarying mediump vec4 v_id;\n#endif\nvoid main() {\n#ifdef PATTERN\n  mediump vec2 normalizedTextureCoord = mod(v_tileTextureCoord, 1.0);\n  mediump vec2 samplePos = mix(u_pattern_tl, u_pattern_br, normalizedTextureCoord);\n  lowp vec4 color = texture2D(u_texture, samplePos);\n  gl_FragColor = u_opacity * color;\n#else\n  gl_FragColor = u_color;\n#endif\n#ifdef ID\n  if (gl_FragColor.a < 1.0 / 255.0) {\n    discard;\n  }\n  gl_FragColor = v_id;\n#endif\n}","background.vert":"precision mediump float;\nattribute vec2 a_pos;\n#ifdef ID\nuniform mediump vec4 u_id;\nvarying mediump vec4 v_id;\n#endif\nuniform highp mat3 u_dvsMat3;\nuniform mediump float u_coord_range;\nuniform mediump float u_depth;\n#ifdef PATTERN\nuniform mediump mat3 u_pattern_matrix;\nvarying mediump vec2 v_tileTextureCoord;\n#endif\nvoid main() {\n  gl_Position = vec4((u_dvsMat3 * vec3(u_coord_range * a_pos, 1.0)).xy, u_depth, 1.0);\n#ifdef PATTERN\n  v_tileTextureCoord = (u_pattern_matrix * vec3(a_pos, 1.0)).xy;\n#endif\n#ifdef ID\n  v_id = u_id / 255.0;\n#endif\n}"},circle:{"circle.frag":"precision lowp float;\nvarying lowp vec4 v_color;\nvarying lowp vec4 v_stroke_color;\nvarying mediump float v_blur;\nvarying mediump float v_stroke_width;\nvarying mediump float v_radius;\nvarying mediump vec2 v_offset;\n#ifdef ID\nvarying mediump vec4 v_id;\n#endif\nvoid main()\n{\n  mediump float dist = length(v_offset);\n  mediump float alpha = smoothstep(0.0, -v_blur, dist - 1.0);\n  lowp float color_mix_ratio = v_stroke_width < 0.01 ? 0.0 : smoothstep(-v_blur, 0.0, dist - v_radius / (v_radius + v_stroke_width));\n  gl_FragColor = alpha * mix(v_color, v_stroke_color, color_mix_ratio);\n#ifdef ID\n  if (gl_FragColor.a < 1.0 / 255.0) {\n    discard;\n  }\n  gl_FragColor = v_id;\n#endif\n}","circle.vert":"precision mediump float;\nattribute vec2 a_pos;\nattribute vec4 a_color;\nattribute vec4 a_stroke_color;\nattribute vec4 a_data;\nconst float sizePrecision = 0.25;\nconst float blurPrecision = 0.03125;\nvarying lowp vec4 v_color;\nvarying lowp vec4 v_stroke_color;\nvarying mediump float v_blur;\nvarying mediump float v_stroke_width;\nvarying mediump float v_radius;\nvarying mediump vec2 v_offset;\n#ifdef ID\nuniform mediump vec4 u_id;\nvarying mediump vec4 v_id;\n#endif\nuniform highp mat3 u_dvsMat3;\nuniform highp mat3 u_displayMat3;\nuniform mediump vec2 u_circleTranslation;\nuniform mediump float u_depth;\nuniform mediump float u_radius;\nuniform lowp vec4 u_color;\nuniform mediump float u_blur;\nuniform mediump float u_stroke_width;\nuniform lowp vec4 u_stroke_color;\nuniform mediump float u_antialiasingWidth;\nvoid main()\n{\n  v_color = a_color * u_color;\n  v_stroke_color = a_stroke_color * u_stroke_color;\n  v_stroke_width = a_data[1] * sizePrecision * u_stroke_width;\n  v_radius = a_data[2] * u_radius;\n  v_blur = max(a_data[0] * blurPrecision + u_blur, u_antialiasingWidth / (v_radius + v_stroke_width));\n  mediump vec2 offset = vec2(mod(a_pos, 2.0) * 2.0 - 1.0);\n  v_offset = offset;\n#ifdef ID\n  v_id = u_id / 255.0;\n#endif\n  mediump vec3 pos = u_dvsMat3 * vec3(a_pos * 0.5, 1.0) + u_displayMat3 * vec3((v_radius + v_stroke_width) * offset + u_circleTranslation, 0.0);\n  gl_Position = vec4(pos.xy, u_depth, 1.0);\n}"},fill:{"fill.frag":"precision lowp float;\n#ifdef PATTERN\nuniform mediump vec2 u_pattern_tl;\nuniform mediump vec2 u_pattern_br;\nuniform lowp sampler2D u_texture;\nvarying mediump vec2 v_tileTextureCoord;\n#endif\n#ifdef ID\nvarying mediump vec4 v_id;\n#endif\nvarying lowp vec4 v_color;\nvec4 mixColors(vec4 color1, vec4 color2) {\n  float compositeAlpha = color2.a + color1.a * (1.0 - color2.a);\n  vec3 compositeColor = color2.rgb + color1.rgb * (1.0 - color2.a);\n  return vec4(compositeColor, compositeAlpha);\n}\nvoid main()\n{\n#ifdef PATTERN\n  mediump vec2 normalizedTextureCoord = fract(v_tileTextureCoord);\n  mediump vec2 samplePos = mix(u_pattern_tl, u_pattern_br, normalizedTextureCoord);\n  lowp vec4 color = texture2D(u_texture, samplePos);\n  gl_FragColor = v_color[3] * color;\n#else\n  gl_FragColor = v_color;\n#endif\n#ifdef ID\n  if (gl_FragColor.a < 1.0 / 255.0) {\n    discard;\n  }\n  gl_FragColor = v_id;\n#endif\n}","fill.vert":"precision mediump float;\nattribute vec2 a_pos;\nuniform highp mat3 u_dvsMat3;\nuniform highp mat3 u_displayMat3;\nuniform mediump float u_depth;\nuniform mediump vec2 u_fillTranslation;\n#ifdef PATTERN\nuniform mediump mat3 u_pattern_matrix;\nvarying mediump vec2 v_tileTextureCoord;\n#endif\n#ifdef ID\nuniform mediump vec4 u_id;\nvarying mediump vec4 v_id;\n#endif\n#ifdef DD\nattribute vec4 a_color;\n#endif\nuniform lowp vec4 u_color;\nvarying lowp vec4 v_color;\nvoid main()\n{\n#ifdef DD\n  v_color = a_color * u_color;\n#else\n  v_color = u_color;\n#endif\n#ifdef ID\n  v_id = u_id / 255.0;\n#endif\n#ifdef PATTERN\n  v_tileTextureCoord = (u_pattern_matrix * vec3(a_pos, 1.0)).xy;\n#endif\n  vec3 pos = u_dvsMat3 * vec3(a_pos, 1.0) + u_displayMat3 * vec3(u_fillTranslation, 0.0);\n  gl_Position = vec4(pos.xy, u_depth, 1.0);\n}"},icon:{"icon.frag":"precision mediump float;\nuniform lowp sampler2D u_texture;\n#ifdef SDF\nuniform lowp vec4 u_color;\nuniform lowp vec4 u_outlineColor;\nuniform mediump float u_outlineSize;\n#endif\nvarying mediump vec2 v_tex;\nvarying lowp float v_transparency;\nvarying mediump vec2 v_size;\nvarying lowp vec4 v_color;\n#ifdef ID\nvarying mediump vec4 v_id;\n#endif\n#include <util/encoding.glsl>\nvec4 mixColors(vec4 color1, vec4 color2) {\n  float compositeAlpha = color2.a + color1.a * (1.0 - color2.a);\n  vec3 compositeColor = color2.rgb + color1.rgb * (1.0 - color2.a);\n  return vec4(compositeColor, compositeAlpha);\n}\nvoid main()\n{\n#ifdef SDF\n  lowp vec4 fillPixelColor = v_color;\n  float d = rgba2float(texture2D(u_texture, v_tex)) - 0.5;\n  const float sofetEdgeRatio = 0.248062016;\n  float size = max(v_size.x, v_size.y);\n  float dist = d * sofetEdgeRatio * size;\n  fillPixelColor *= clamp(0.5 - dist, 0.0, 1.0);\n  if (u_outlineSize > 0.25) {\n    lowp vec4 outlinePixelColor = u_outlineColor;\n    const float outlineLimitRatio = (16.0 / 86.0);\n    float clampedOutlineSize = sofetEdgeRatio * min(u_outlineSize, outlineLimitRatio * max(v_size.x, v_size.y));\n    outlinePixelColor *= clamp(0.5 - (abs(dist) - clampedOutlineSize), 0.0, 1.0);\n    gl_FragColor = v_transparency * mixColors(fillPixelColor, outlinePixelColor);\n  }\n  else {\n    gl_FragColor = v_transparency * fillPixelColor;\n  }\n#else\n  lowp vec4 texColor = texture2D(u_texture, v_tex);\n  gl_FragColor = v_transparency * texColor;\n#endif\n#ifdef ID\n  if (gl_FragColor.a < 1.0 / 255.0) {\n    discard;\n  }\n  gl_FragColor = v_id;\n#endif\n}","icon.vert":"attribute vec2 a_pos;\nattribute vec2 a_vertexOffset;\nattribute vec4 a_tex;\nattribute vec4 a_levelInfo;\n#ifdef DD\nattribute vec4 a_color;\nattribute mediump float a_size;\n#endif\nuniform lowp vec4 u_color;\nuniform mediump float u_size;\n#ifdef ID\nuniform mediump vec4 u_id;\nvarying mediump vec4 v_id;\n#endif\nvarying lowp vec4 v_color;\nuniform highp mat3 u_dvsMat3;\nuniform highp mat3 u_displayMat3;\nuniform highp mat3 u_displayViewMat3;\nuniform mediump vec2 u_iconTranslation;\nuniform vec2 u_mosaicSize;\nuniform mediump float u_depth;\nuniform mediump float u_mapRotation;\nuniform mediump float u_level;\nuniform lowp float u_keepUpright;\nuniform mediump float u_fadeSpeed;\nuniform mediump float u_minfadeLevel;\nuniform mediump float u_maxfadeLevel;\nuniform mediump float u_fadeChange;\nuniform mediump float u_opacity;\nvarying mediump vec2 v_tex;\nvarying lowp float v_transparency;\nvarying mediump vec2 v_size;\nconst float C_OFFSET_PRECISION = 1.0 / 8.0;\nconst float C_256_TO_RAD = 3.14159265359 / 128.0;\nconst float C_DEG_TO_RAD = 3.14159265359 / 180.0;\nconst float tileCoordRatio = 1.0 / 8.0;\nvoid main()\n{\n  mediump float a_labelMinLevel = a_levelInfo[0];\n  mediump float a_angle         = a_levelInfo[1];\n  mediump float a_minLevel      = a_levelInfo[2];\n  mediump float a_maxLevel      = a_levelInfo[3];\n  mediump float delta_z = 0.0;\n  mediump float rotated = mod(a_angle + u_mapRotation, 256.0);\n  delta_z += (1.0 - step(u_keepUpright, 0.0)) * step(64.0, rotated) * (1.0 - step(192.0, rotated));\n  delta_z += 1.0 - step(a_minLevel, u_level);\n  delta_z += step(a_maxLevel, u_level);\n  mediump float alpha = u_fadeSpeed != 0.0 ? clamp((u_fadeChange - a_labelMinLevel) / u_fadeSpeed, 0.0, 1.0) : 1.0;\n  v_transparency = (u_fadeSpeed >= 0.0 ? alpha : 1.0 - alpha);\n  if (u_maxfadeLevel < a_labelMinLevel)\n  {\n    v_transparency = 0.0;\n  }\n  if (u_minfadeLevel >= a_labelMinLevel)\n  {\n    v_transparency = 1.0;\n  }\n  delta_z += step(v_transparency, 0.0);\n  vec2 offset = C_OFFSET_PRECISION * a_vertexOffset;\n  v_size = abs(offset);\n#ifdef SDF\n  offset = (120.0 / 86.0) * offset;\n#endif\n#ifdef DD\n  mediump float icon_size = a_size * u_size;\n#else\n  mediump float icon_size = u_size;\n#endif\n  mediump vec3 pos = u_dvsMat3 * vec3(a_pos, 1.0) + u_displayViewMat3 * vec3(icon_size * offset, 0.0) + u_displayMat3 * vec3(u_iconTranslation, 0.0);\n  gl_Position = vec4(pos.xy, u_depth + delta_z, 1.0);\n#ifdef DD\n  v_color = a_color * u_color;\n#else\n  v_color = u_color;\n#endif\n#ifdef ID\n  v_id = u_id / 255.0;\n#endif\n  v_tex = a_tex.xy / u_mosaicSize;\n  v_transparency *= v_color.w;\n}"},line:{"line.frag":"varying mediump vec2 v_normal;\nvarying highp float v_accumulatedDistance;\nvarying mediump float v_lineHalfWidth;\nvarying lowp vec4 v_color;\nvarying mediump float v_blur;\n#ifdef PATTERN\nuniform mediump vec2 u_pattern_tl;\nuniform mediump vec2 u_pattern_br;\nuniform mediump vec2 u_spriteSize;\nuniform sampler2D u_texture;\nconst mediump float tileCoordRatio = 8.0;\n#else\nvarying mediump vec2 v_dasharray;\n#endif\n#ifdef ID\nvarying mediump vec4 v_id;\n#endif\nvoid main()\n{\n  mediump float fragDist = length(v_normal) * v_lineHalfWidth;\n  lowp float alpha = clamp((v_lineHalfWidth - fragDist) / v_blur, 0.0, 1.0);\n#ifdef PATTERN\n  mediump float relativeTexX = mod((v_accumulatedDistance + v_normal.x * v_lineHalfWidth * tileCoordRatio) / u_spriteSize.x, 1.0);\n  mediump float relativeTexY = 0.5 + (v_normal.y * v_lineHalfWidth / u_spriteSize.y);\n  mediump vec2 texCoord = mix(u_pattern_tl, u_pattern_br, vec2(relativeTexX, relativeTexY));\n  lowp vec4 color = texture2D(u_texture, texCoord);\n  gl_FragColor = alpha * v_color[3] * color;\n#else\n  lowp float dashPos =  mod(v_accumulatedDistance, v_dasharray.x + v_dasharray.y);\n  lowp float dashAlpha = clamp(min(dashPos, v_dasharray.x - dashPos) + 0.5, 0.0, 1.0);\n  dashAlpha = max(sign(-v_dasharray.y), dashAlpha);\n  alpha *= dashAlpha;\n  gl_FragColor = alpha * v_color;\n#endif\n#ifdef ID\n  if (gl_FragColor.a < 1.0 / 255.0) {\n    discard;\n  }\n  gl_FragColor = v_id;\n#endif\n}","line.vert":"attribute vec2 a_pos;\nattribute vec4 a_offsetAndNormal;\nattribute vec2 a_accumulatedDistance;\nuniform highp mat3 u_dvsMat3;\nuniform highp mat3 u_displayMat3;\nuniform highp mat3 u_displayViewMat3;\nuniform mediump vec2 u_lineTranslation;\nuniform mediump float u_blur;\nuniform mediump float u_antialiasing;\nuniform mediump float u_depth;\nvarying mediump vec2 v_normal;\nvarying highp float v_accumulatedDistance;\nconst float scale = 1.0 / 31.0;\n#ifdef DD\nattribute vec4 a_color;\nattribute mediump float a_width;\n#endif\nuniform lowp vec4 u_color;\nuniform mediump float u_width;\n#ifdef ID\nuniform mediump vec4 u_id;\nvarying mediump vec4 v_id;\n#endif\nvarying lowp vec4 v_color;\nvarying mediump float v_lineHalfWidth;\nvarying mediump float v_blur;\n#ifndef PATTERN\nuniform mediump vec2 u_dasharray;\nvarying mediump vec2 v_dasharray;\n#endif\nvoid main()\n{\n  v_normal = a_offsetAndNormal.zw * scale;\n#ifdef DD\n  v_lineHalfWidth = a_width * u_width;\n#else\n  v_lineHalfWidth = u_width;\n#endif\n  v_lineHalfWidth += u_antialiasing;\n  v_lineHalfWidth *= 0.5;\n#ifndef PATTERN\n#ifdef DD\n  v_dasharray = u_dasharray * a_width;\n#else\n  v_dasharray = u_dasharray * u_width;\n#endif\n#endif\n  mediump vec2 dist = v_lineHalfWidth * scale * a_offsetAndNormal.xy;\n  mediump vec3 pos = u_dvsMat3 * vec3(a_pos, 1.0) +  u_displayViewMat3 * vec3(dist, 0.0) + u_displayMat3 * vec3(u_lineTranslation, 0.0);\n  gl_Position = vec4(pos.xy, u_depth, 1.0);\n  v_accumulatedDistance = a_accumulatedDistance.x;\n  v_blur = u_blur + u_antialiasing;\n  #ifdef DD\n    v_color = a_color * u_color;\n  #else\n    v_color = u_color;\n  #endif\n  #ifdef ID\n    v_id = u_id / 255.0;\n  #endif\n}"},outline:{"outline.frag":"varying lowp vec4 v_color;\nvarying mediump vec2 v_normal;\n#ifdef ID\nvarying mediump vec4 v_id;\n#endif\nvoid main()\n{\n  lowp float dist = abs(v_normal.y);\n  lowp float alpha = smoothstep(1.0, 0.0, dist);\n  gl_FragColor = alpha * v_color;\n#ifdef ID\n  if (gl_FragColor.a < 1.0 / 255.0) {\n    discard;\n  }\n  gl_FragColor = v_id;\n#endif\n}","outline.vert":"attribute vec2 a_pos;\nattribute vec2 a_offset;\nattribute vec2 a_xnormal;\n#ifdef DD\nattribute vec4 a_color;\n#endif\nuniform lowp vec4 u_color;\nvarying lowp vec4 v_color;\n#ifdef ID\nuniform mediump vec4 u_id;\nvarying mediump vec4 v_id;\n#endif\nuniform highp mat3 u_dvsMat3;\nuniform highp mat3 u_displayMat3;\nuniform mediump vec2 u_fillTranslation;\nuniform mediump float u_depth;\nuniform mediump float u_outline_width;\nvarying lowp vec2 v_normal;\nconst float scale = 1.0 / 15.0;\nvoid main()\n{\n#ifdef DD\n  v_color = a_color * u_color;\n#else\n  v_color = u_color;\n#endif\n#ifdef ID\n  v_id = u_id / 255.0;\n#endif\n  v_normal = a_xnormal;\n  mediump vec2 dist = u_outline_width * scale * a_offset;\n  mediump vec3 pos = u_dvsMat3 * vec3(a_pos, 1.0) + u_displayMat3 * vec3(dist + u_fillTranslation, 0.0);\n  gl_Position = vec4(pos.xy, u_depth, 1.0);\n}"},text:{"text.frag":"uniform lowp sampler2D u_texture;\nuniform mediump float u_edgeDistance;\nvarying lowp vec2 v_tex;\nvarying lowp float v_transparency;\nvarying lowp vec4 v_color;\nvarying mediump float v_edgeWidth;\nvarying mediump float v_edgeDistance;\n#ifdef ID\nvarying mediump vec4 v_id;\n#endif\nvoid main()\n{\n  lowp float dist = texture2D(u_texture, v_tex).a;\n  mediump float alpha = smoothstep(v_edgeDistance - v_edgeWidth, v_edgeDistance + v_edgeWidth, dist) * v_transparency;\n  gl_FragColor = alpha * v_color;\n#ifdef ID\n  if (gl_FragColor.a < 1.0 / 255.0) {\n    discard;\n  }\n  gl_FragColor = v_id;\n#endif\n}","text.vert":"attribute vec2 a_pos;\nattribute vec2 a_vertexOffset;\nattribute vec4 a_tex;\nattribute vec4 a_levelInfo;\nuniform lowp vec4 u_color;\n#ifdef DD\nattribute vec4 a_color;\n#endif\nvarying lowp vec4 v_color;\nuniform mediump float u_size;\n#ifdef DD\nattribute mediump float a_size;\n#endif\nvarying mediump float v_size;\n#ifdef ID\nuniform mediump vec4 u_id;\nvarying mediump vec4 v_id;\n#endif\nuniform highp mat3 u_dvsMat3;\nuniform highp mat3 u_displayMat3;\nuniform highp mat3 u_displayViewMat3;\nuniform mediump vec2 u_textTranslation;\nuniform vec2 u_mosaicSize;\nuniform mediump float u_depth;\nuniform mediump float u_mapRotation;\nuniform mediump float u_level;\nuniform lowp float u_keepUpright;\nuniform mediump float u_fadeSpeed;\nuniform mediump float u_minfadeLevel;\nuniform mediump float u_maxfadeLevel;\nuniform mediump float u_fadeChange;\nuniform mediump float u_opacity;\nvarying lowp vec2 v_tex;\nvarying lowp float v_transparency;\nconst float offsetPrecision = 1.0 / 8.0;\nconst mediump float edgePos = 0.75;\nuniform mediump float u_edgeDistance;\nuniform mediump float u_edgeBlur;\nuniform mediump float u_antialiasingWidth;\nvarying mediump float v_edgeDistance;\nvarying mediump float v_edgeWidth;\nuniform lowp float u_halo;\nconst float sdfFontScale = 1.0 / 24.0;\nvoid main()\n{\n  mediump float a_labelMinLevel = a_levelInfo[0];\n  mediump float a_angle        = a_levelInfo[1];\n  mediump float a_minLevel    = a_levelInfo[2];\n  mediump float a_maxLevel    = a_levelInfo[3];\n  mediump float delta_z = 0.0;\n  mediump float rotated = mod(a_angle + u_mapRotation, 256.0);\n  delta_z += (1.0 - step(u_keepUpright, 0.0)) * step(64.0, rotated) * (1.0 - step(192.0, rotated));\n  delta_z += 1.0 - step(a_minLevel, u_level);\n  delta_z += step(a_maxLevel, u_level);\n  mediump float alpha = u_fadeSpeed != 0.0 ? clamp((u_fadeChange - a_labelMinLevel) / u_fadeSpeed, 0.0, 1.0) : 1.0;\n  v_transparency = (u_fadeSpeed >= 0.0 ? alpha : 1.0 - alpha);\n  if (u_maxfadeLevel < a_labelMinLevel)\n  {\n    v_transparency = 0.0;\n  }\n  if (u_minfadeLevel >= a_labelMinLevel)\n  {\n    v_transparency = 1.0;\n  }\n  delta_z += step(v_transparency, 0.0);\n  v_tex = a_tex.xy / u_mosaicSize;\n#ifdef DD\n  if (u_halo > 0.5)\n  {\n    v_color = u_color;\n  }\n  else\n  {\n    v_color = a_color * u_color;\n  }\n#else\n  v_color = u_color;\n#endif\n#ifdef DD\n  v_size = a_size * u_size;\n#else\n  v_size = u_size;\n#endif\n#ifdef ID\n  v_id = u_id / 255.0;\n#endif\n  v_edgeDistance = edgePos - u_edgeDistance / v_size;\n  v_edgeWidth = (u_antialiasingWidth + u_edgeBlur) / v_size;\n  mediump vec3 pos = u_dvsMat3 * vec3(a_pos, 1.0) + sdfFontScale * u_displayViewMat3 * vec3(offsetPrecision * v_size * a_vertexOffset, 0.0) + u_displayMat3 * vec3(u_textTranslation, 0.0);\n  gl_Position = vec4(pos.xy, u_depth + delta_z, 1.0);\n}"},util:{"encoding.glsl":"const vec4 rgba2float_factors = vec4(\n    255.0 / (256.0),\n    255.0 / (256.0 * 256.0),\n    255.0 / (256.0 * 256.0 * 256.0),\n    255.0 / (256.0 * 256.0 * 256.0 * 256.0)\n  );\nfloat rgba2float(vec4 rgba) {\n  return dot(rgba, rgba2float_factors);\n}"}}});