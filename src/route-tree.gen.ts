/* eslint-disable @typescript-eslint/no-explicit-any */
import { Route as rootRoute } from "./app/__root";
import { Route as IndexImport } from "./app/index";
import { Route as ChatImport } from "./app/chat/page";
import { Route as LoginImport } from "./app/(auth)/login/page";

// Create/Update Routes

const IndexRoute = IndexImport.update({
  id: "/",
  path: "/",
  getParentRoute: () => rootRoute,
} as any);

const LoginRoute = LoginImport.update({
  id: "/(auth)/login",
  path: "/login",
  getParentRoute: () => rootRoute,
} as any);

const ChatRoute = ChatImport.update({
  id: "/chat",
  path: "/chat",
  getParentRoute: () => rootRoute,
} as any);

// Populate the FileRoutesByPath interface

declare module "@tanstack/react-router" {
  interface FileRoutesByPath {
    "/": {
      id: "/";
      path: "/";
      fullPath: "/";
      preLoaderRoute: typeof IndexImport;
      parentRoute: typeof rootRoute;
    };
    "/(auth)/login": {
      id: "/(auth)/login";
      path: "/login";
      fullPath: "/login";
      preLoaderRoute: typeof LoginRoute;
      parentRoute: typeof rootRoute;
    };
    "/chat": {
      id: "/chat";
      path: "/chat";
      fullPath: "/chat";
      preLoaderRoute: typeof ChatRoute;
      parentRoute: typeof rootRoute;
    };
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  "/": typeof IndexRoute;
  "/login": typeof LoginRoute;
  "/chat": typeof ChatRoute;
}

export interface FileRoutesByTo {
  "/": typeof IndexRoute;
  "/login": typeof LoginRoute;
  "/chat": typeof ChatRoute;
}

export interface FileRoutesById {
  __root__: typeof rootRoute;
  "/": typeof IndexRoute;
  "/(auth)/login": typeof LoginRoute;
  "/chat": typeof ChatRoute;
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath;
  fullPaths: "/" | "/chat" | "/login";
  fileRoutesByTo: FileRoutesByTo;
  to: "/" | "/chat" | "/login";
  id: "__root__" | "/" | "/chat" | "/(auth)/login";
  fileRoutesById: FileRoutesById;
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute;
  LoginRoute: typeof LoginRoute;
  ChatRoute: typeof ChatRoute;
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  LoginRoute: LoginRoute,
  ChatRoute: ChatRoute,
};

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>();

/*ROUTE_MANIFEST_START
  {
    "routes" : {
      
    }
  }  
  */
