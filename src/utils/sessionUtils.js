// Session Storage Utility Functions

/**
 * Gets a summary of current session storage contents
 * @returns {Object} Summary of session storage
 */
export const getSessionStorageSummary = () => {
  const summary = {
    totalItems: sessionStorage.length,
    keys: [],
    authenticationKeys: [],
    pcBuilderKeys: [],
    comparisonKeys: [],
    monitoringKeys: [],
    otherKeys: []
  };

  // Collect all keys
  for (let i = 0; i < sessionStorage.length; i++) {
    const key = sessionStorage.key(i);
    summary.keys.push(key);

    // Categorize keys
    if (key.includes('user_type') || key.includes('logged') || key.includes('logout')) {
      summary.authenticationKeys.push(key);
    } else if (key.includes('selected_') || key.includes('pcbuilder')) {
      summary.pcBuilderKeys.push(key);
    } else if (key.includes('compare')) {
      summary.comparisonKeys.push(key);
    } else if (key.includes('monitoring') || key.includes('original_')) {
      summary.monitoringKeys.push(key);
    } else {
      summary.otherKeys.push(key);
    }
  }

  return summary;
};

/**
 * Logs detailed session storage information
 * @param {string} context - Context for the log (e.g., "before logout", "after logout")
 */
export const logSessionStorageDetails = (context = "Session Storage") => {
  const summary = getSessionStorageSummary();
  
  console.group(`📊 ${context} - Session Storage Details`);
  console.log(`Total Items: ${summary.totalItems}`);
  
  if (summary.authenticationKeys.length > 0) {
    console.log("🔐 Authentication Keys:", summary.authenticationKeys);
    summary.authenticationKeys.forEach(key => {
      console.log(`  ${key}: ${sessionStorage.getItem(key)}`);
    });
  }
  
  if (summary.pcBuilderKeys.length > 0) {
    console.log("🔧 PC Builder Keys:", summary.pcBuilderKeys);
    summary.pcBuilderKeys.forEach(key => {
      const value = sessionStorage.getItem(key);
      console.log(`  ${key}: ${value ? (value.length > 100 ? value.substring(0, 100) + '...' : value) : value}`);
    });
  }
  
  if (summary.comparisonKeys.length > 0) {
    console.log("⚖️ Comparison Keys:", summary.comparisonKeys);
    summary.comparisonKeys.forEach(key => {
      console.log(`  ${key}: ${sessionStorage.getItem(key)}`);
    });
  }
  
  if (summary.monitoringKeys.length > 0) {
    console.log("👁️ Monitoring Keys:", summary.monitoringKeys);
    summary.monitoringKeys.forEach(key => {
      console.log(`  ${key}: ${sessionStorage.getItem(key)}`);
    });
  }
  
  if (summary.otherKeys.length > 0) {
    console.log("🔍 Other Keys:", summary.otherKeys);
    summary.otherKeys.forEach(key => {
      const value = sessionStorage.getItem(key);
      console.log(`  ${key}: ${value ? (value.length > 100 ? value.substring(0, 100) + '...' : value) : value}`);
    });
  }
  
  console.groupEnd();
  
  return summary;
};

/**
 * Clears all PC Builder related session storage
 */
export const clearPCBuilderSessionStorage = () => {
  const pcBuilderKeys = [
    "pcbuilder_selected_components",
    "selected_cpu",
    "selected_gpu", 
    "selected_motherboard",
    "selected_memory",
    "selected_storage",
    "selected_powersupply",
    "selected_case",
    "selected_cpucooler",
    "selected_monitor",
    "selected_operatingsystem"
  ];

  console.log("🧹 Clearing PC Builder session storage...");
  pcBuilderKeys.forEach(key => {
    if (sessionStorage.getItem(key)) {
      console.log(`  Removing: ${key}`);
      sessionStorage.removeItem(key);
    }
  });
};

/**
 * Clears all comparison related session storage
 */
export const clearComparisonSessionStorage = () => {
  const comparisonKeys = [
    "cpu_compareSelection",
    "gpu_compareSelection",
    "motherboard_compareSelection",
    "memory_compareSelection",
    "storage_compareSelection",
    "powersupply_compareSelection",
    "case_compareSelection",
    "cpucooler_compareSelection",
    "monitor_compareSelection",
    "operatingsystem_compareSelection"
  ];

  console.log("🧹 Clearing comparison session storage...");
  comparisonKeys.forEach(key => {
    if (sessionStorage.getItem(key)) {
      console.log(`  Removing: ${key}`);
      sessionStorage.removeItem(key);
    }
  });
};

/**
 * Performs comprehensive session storage clearing with verification
 */
export const performLogoutSessionClear = () => {
  console.log("🚀 Starting comprehensive session storage clearing...");
  
  // Log before clearing
  logSessionStorageDetails("Before Logout");
  
  // Clear authentication data
  sessionStorage.removeItem("user_type");
  sessionStorage.removeItem("just_logged_in");
  sessionStorage.setItem("just_logged_out", "true");
  sessionStorage.setItem("logout_timestamp", Date.now().toString());
  
  // Clear monitoring mode flags
  sessionStorage.removeItem("monitoring_mode");
  sessionStorage.removeItem("original_user_type");
  sessionStorage.removeItem("original_user_id");
  
  // Clear PC Builder data
  clearPCBuilderSessionStorage();
  
  // Clear comparison data
  clearComparisonSessionStorage();
  
  // Log after clearing
  logSessionStorageDetails("After Logout");
  
  // Final verification
  const remainingPCBuilderItems = [];
  const remainingComparisonItems = [];
  
  for (let i = 0; i < sessionStorage.length; i++) {
    const key = sessionStorage.key(i);
    if (key.includes('selected_') || key.includes('pcbuilder')) {
      remainingPCBuilderItems.push(key);
    }
    if (key.includes('compare')) {
      remainingComparisonItems.push(key);
    }
  }
  
  if (remainingPCBuilderItems.length > 0) {
    console.warn("⚠️ PC Builder items still present:", remainingPCBuilderItems);
  }
  
  if (remainingComparisonItems.length > 0) {
    console.warn("⚠️ Comparison items still present:", remainingComparisonItems);
  }
  
  if (remainingPCBuilderItems.length === 0 && remainingComparisonItems.length === 0) {
    console.log("✅ Session storage successfully cleared!");
  }
  
  return {
    success: remainingPCBuilderItems.length === 0 && remainingComparisonItems.length === 0,
    remainingPCBuilder: remainingPCBuilderItems,
    remainingComparison: remainingComparisonItems,
    totalRemaining: sessionStorage.length
  };
};

/**
 * Checks if user session is completely clean (no sensitive data remaining)
 */
export const isSessionClean = () => {
  const sensitiveKeys = [
    "user_type",
    "monitoring_mode",
    "original_user_type", 
    "original_user_id"
  ];
  
  const pcBuilderKeys = [
    "pcbuilder_selected_components",
    "selected_cpu", "selected_gpu", "selected_motherboard",
    "selected_memory", "selected_storage", "selected_powersupply",
    "selected_case", "selected_cpucooler", "selected_monitor", 
    "selected_operatingsystem"
  ];
  
  const comparisonKeys = [
    "cpu_compareSelection", "gpu_compareSelection", "motherboard_compareSelection",
    "memory_compareSelection", "storage_compareSelection", "powersupply_compareSelection",
    "case_compareSelection", "cpucooler_compareSelection", "monitor_compareSelection",
    "operatingsystem_compareSelection"
  ];
  
  const allSensitiveKeys = [...sensitiveKeys, ...pcBuilderKeys, ...comparisonKeys];
  const foundKeys = [];
  
  allSensitiveKeys.forEach(key => {
    if (sessionStorage.getItem(key)) {
      foundKeys.push(key);
    }
  });
  
  return {
    isClean: foundKeys.length === 0,
    foundSensitiveKeys: foundKeys
  };
};
