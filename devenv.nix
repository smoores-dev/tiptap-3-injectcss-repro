{
  pkgs,
  lib,
  config,
  inputs,
  ...
}:

{
  # https://devenv.sh/languages/
  languages.javascript = {
    enable = true;
    corepack.enable = true;
  };
}
