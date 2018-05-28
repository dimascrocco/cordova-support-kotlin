const fs = require('fs');
const gradleFilename = './platforms/android/build.gradle';
const buildContent = fs.readFileSync(gradleFilename).toString();
const APPLY_KOTLIN_ANDROID = '\napply plugin: "kotlin-android"\n';
const APPLY_KOTLIN_ANDROID_EXTENSIONS = '\napply plugin: "kotlin-android-extensions"\n';
const KOTLIN_VERSION = '\next.kotlin_version = "1.2.41"\n';
const KOTLIN_GRADLE_PLUGIN = '\nclasspath "org.jetbrains.kotlin:kotlin-gradle-plugin:$kotlin_version"\n';
let rewrite = buildContent;
// TODO:Not Exist Kotlin-Android
if (!buildContent.match(/apply\s+plugin(:|\s+:)(\s+|)(['"])kotlin-android(['"])/g)) appendContent(/com.android.application['"]/g, APPLY_KOTLIN_ANDROID);
// TODO:Not Exist Kotlin-Android-Extensions
if (!buildContent.match(/apply\s+plugin(:|\s+:)(\s+|)(['"])kotlin-android-extensions(['"])/g)) appendContent(/com.android.application['"]/g, APPLY_KOTLIN_ANDROID_EXTENSIONS);
// TODO:Not Exist Kotlin-Version
if (!buildContent.match(/ext.kotlin_version/g)) appendContent(/buildscript(\s+|)\{\s+/g, KOTLIN_VERSION);
// TODO:Not Exist Kotlin-Gradle-Plugin
if (!buildContent.match(/kotlin-gradle-plugin/g)) appendContent(/classpath\s+(['"])[\w.:]+(['"])/g, KOTLIN_GRADLE_PLUGIN);

function appendContent(reg, content) {
    const pos = rewrite.search(reg);
    const len = rewrite.match(reg)[0].length;
    const header = rewrite.substring(0, pos + len);
    const footer = rewrite.substring(pos + len);
    rewrite = header + content + footer;
}

fs.writeFileSync(gradleFilename, rewrite);
