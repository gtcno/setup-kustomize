import * as core from "@actions/core";
import * as installer from './installer';


async function run() {
    try {
        let version = core.getInput("version", {required: true});
        await installer.getKustomize(version)
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();
