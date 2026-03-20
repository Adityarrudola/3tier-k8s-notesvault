const Note = require('./models/Note'); // make sure model name is Note

const seedNotes = [
  { title: "Kubernetes", content: "Container orchestration platform that manages deployment, scaling, and operations of containerized applications using declarative configuration." },

  { title: "Pod", content: "Smallest deployable unit in Kubernetes that runs one or more containers sharing network and storage." },

  { title: "Deployment", content: "Manages Pods and ReplicaSets, providing scaling, rolling updates, and rollback capabilities." },

  { title: "Service", content: "Provides a stable network endpoint to access a dynamic set of Pods." },

  { title: "ClusterIP", content: "Default service type that exposes a service internally within the cluster." },

  { title: "NodePort", content: "Exposes a service on a static port on each node for external access." },

  { title: "Ingress", content: "Manages external HTTP/HTTPS access to services with routing rules based on path or host." },

  { title: "Namespace", content: "Logical isolation of resources within a cluster, used for multi-team or multi-environment setups." },

  { title: "ConfigMap", content: "Stores non-sensitive configuration data and injects it into containers via environment variables or volumes." },

  { title: "Secret", content: "Stores sensitive data such as passwords, API keys, and tokens securely in Kubernetes." },

  { title: "Persistent Volume", content: "Cluster-level storage resource that persists beyond Pod lifecycle." },

  { title: "Persistent Volume Claim", content: "Request made by a Pod to use persistent storage provided by a Persistent Volume." },

  { title: "ReplicaSet", content: "Ensures a specified number of identical Pod replicas are running at all times." },

  { title: "DaemonSet", content: "Ensures that a copy of a Pod runs on all or selected nodes in the cluster." },

  { title: "Horizontal Pod Autoscaler", content: "Automatically scales the number of Pods based on CPU or memory usage." },

  { title: "Vertical Pod Autoscaler", content: "Automatically adjusts CPU and memory requests/limits for Pods." },

  { title: "Kubernetes Architecture", content: "Consists of Control Plane (API server, etcd, scheduler, controller manager) and Worker Nodes running application Pods." },

  { title: "kube-apiserver", content: "Central API component that handles all communication within the Kubernetes cluster." },

  { title: "etcd", content: "Distributed key-value store that holds the cluster’s configuration and state." },

  { title: "kube-scheduler", content: "Assigns Pods to nodes based on resource availability and constraints." },

  { title: "kubelet", content: "Node agent that ensures containers are running as expected on each node." },

  { title: "kube-proxy", content: "Handles networking and service routing within the cluster using iptables or IPVS." },

  { title: "Labels", content: "Key-value pairs used to identify and organize Kubernetes resources." },

  { title: "Selectors", content: "Used to filter and match resources based on labels." },

  { title: "Annotations", content: "Metadata attached to objects for informational or tooling purposes, not used for selection." },

  { title: "Rolling Update", content: "Deployment strategy that updates Pods gradually with zero downtime." },

  { title: "Recreate Strategy", content: "Deployment strategy that stops all old Pods before creating new ones, causing downtime." },

  { title: "Blue-Green Deployment", content: "Uses two environments where traffic is switched from old version to new version after validation." },

  { title: "Canary Deployment", content: "Gradually releases a new version to a small percentage of users before full rollout." },

  { title: "Helm", content: "Package manager for Kubernetes used to define, install, and manage applications using charts." },

  { title: "Helm Chart", content: "Collection of Kubernetes manifests packaged together with configurable values." },

  { title: "Argo CD", content: "GitOps continuous delivery tool that syncs Kubernetes cluster state with Git repositories." },

  { title: "GitOps", content: "Deployment approach where Git is the single source of truth for infrastructure and applications." },

  { title: "CNI", content: "Container Network Interface plugin responsible for Pod networking and IP management." },

  { title: "Service Mesh", content: "Infrastructure layer that manages service-to-service communication, security, and observability." },

  { title: "Istio", content: "Popular service mesh providing traffic management, security (mTLS), and observability." },

  { title: "Liveness Probe", content: "Checks if a container is alive; failure triggers a restart." },

  { title: "Readiness Probe", content: "Checks if a container is ready to serve traffic; failure removes it from service endpoints." },

  { title: "Startup Probe", content: "Ensures slow-starting applications are given time before health checks begin." },

  { title: "Job", content: "Runs a Pod to completion for batch processing tasks." },

  { title: "CronJob", content: "Runs Jobs on a scheduled basis similar to cron tasks." }
];

const seedDB = async () => {
  try {
    console.log("Checking DB...");

    const count = await Note.countDocuments();
    console.log("Existing docs:", count);

    if (count === 0) {
      console.log("Seeding notes...");
      await Note.insertMany(seedNotes);
      console.log("Seeding completed");
    } else {
      console.log("Skipping seed, already populated");
    }
  } catch (err) {
    console.error("Seed error:", err);
  }
};

module.exports = seedDB;