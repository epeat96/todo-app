{
  description = "Personal project dev shell with latest Node.js and npm";

  inputs = {
    # Use unstable to always have the freshest Node.js
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
  };

  outputs = { self, nixpkgs }:
    let
      system = "x86_64-linux"; # change to your platform if needed (e.g. aarch64-darwin)
      pkgs = nixpkgs.legacyPackages.${system};
    in {
      devShells.${system}.default = pkgs.mkShell {
        buildInputs = [
          pkgs.nodejs_latest
          pkgs.yarn   # optional
          pkgs.pnpm   # optional
        ];

        shellHook = ''
          echo "Welcome to your Node.js dev shell!"
          echo "Node version: $(node -v)"
          echo "NPM version:  $(npm -v)"
          export PS1="(nix-todo-app) $PS1"
        '';
      };
    };
}
