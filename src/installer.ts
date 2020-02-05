import * as tc from '@actions/tool-cache';
import * as os from 'os';
import * as core from "@actions/core";

export async function getKustomize(version: string) {
    // check cache
    let toolPath: string;
    toolPath = tc.find('kustomize', version);

    if (!toolPath) {
        let downloadPath;
        try {
            downloadPath = await tc.downloadTool(downLoadUrl(version));
        } catch (e) {
            core.error(e);
        }

        let extPath = await tc.extractTar(downloadPath);

        let toolPath = await tc.cacheDir(extPath, "kustomize", version);
        core.addPath(toolPath);
    }
}


function downLoadUrl(version) {
    let platform = os.platform();
    return `https://github.com/kubernetes-sigs/kustomize/releases/download/kustomize/v${version}/kustomize_v${version}_${platform}_amd64.tar.gz`;
}
